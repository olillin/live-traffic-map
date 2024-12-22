const express = require('express')
const oauth2 = require('@badgateway/oauth2-client')

// Create OAuth2 client
const { CLIENT_ID, CLIENT_SECRET } = process.env
if (!(CLIENT_ID && CLIENT_SECRET)) {
    console.error('Missing API credentials')
    process.exit()
}

const client = new oauth2.OAuth2Client({
    server: 'https://ext-api.vasttrafik.se/pr/v4/',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    tokenEndpoint: '/token',
})

// Create API router
const API = express.Router()

API.get('/positions', (req, res) => {
    fetchMapData().then(data => {
        res.send(data)
    })
})

API.get('/details', (req, res) => {
    /** @type {string?} */
    const detailsReference = req.query['detailsReference']
    if (!detailsReference) {
        res.status(400).json({
            success: false,
            error: 'Missing required search parameter detailsReference',
        })
        return
    }
    if (!/^[0-9a-zA-Z]+$/.test(detailsReference)) {
        res.status(400).json({
            success: false,
            error: 'Invalid detailsReference',
        })
        return
    }

    getJourneyDetails(detailsReference).then(details => {
        console.log(details)
        res.json({
            success: true,
            details: details,
        })
    })
})

API.get('/zones', (req, res) => {
    fetchMapData().then(mapData => {
        const positionData = mapData.map(i => [i.latitude, i.longitude])
        const zones = generateZones(bounds, positionData, 100)
        res.json(zones)
    })
})

/** @type {oauth2.OAuth2Token?} */
var token = null
async function authorizedFetch(url, options) {
    if (!token || token.expiresAt <= currentUnixTimestamp()) {
        token = await client.clientCredentials()
    }
    if (options == undefined) {
        options = {}
    }
    if (options.headers == undefined) {
        options.headers = {}
    }
    options.headers['Authorization'] = `Bearer ${token.accessToken}`

    return fetch(url, options)
}

function currentUnixTimestamp() {
    return new Date().getTime()
}

const bounds = [56.1496278, 10.2134046, 60.670150574324886, 17.148177023103646]

/**
 * Take bounds and a list of positions and partition into optimized zones.
 * The zones are optimized to contain as many positions as possible below the zoneCapacity.
 *
 * Boundaries (both input and output) take the form [lowerLeftLat, lowerLeftLong, upperRightLat, upperRightLong]
 *
 * @param {number[]} bounds
 * @param {Array<[number, number]>} positions
 * @param {number} zoneCapacity The max positions that a zone may contain
 */
function generateZones(bounds, positions, zoneCapacity) {
    const boundsHeight = Math.abs(bounds[2] - bounds[0])
    const boundsWidth = Math.abs(bounds[3] - bounds[1])
    const gridSize = Math.ceil(Math.sqrt(positions.length / zoneCapacity))
    const gridPartitionLatitude = boundsHeight / gridSize
    const gridPartitionLongitude = boundsWidth / gridSize

    const zones = []
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            zones.push([
                bounds[0] + gridPartitionLatitude * i, //
                bounds[1] + gridPartitionLongitude * j,
                bounds[0] + gridPartitionLatitude * (i + 1),
                bounds[1] + gridPartitionLongitude * (j + 1),
            ])
        }
    }
    return zones
}

async function fetchMapData() {
    const lowerLeftLat = bounds[0]
    const lowerLeftLong = bounds[1]
    const upperRightLat = bounds[2]
    const upperRightLong = bounds[3]

    let positionData = []
    let promises = []
    const partitions = 6
    for (let y = 0; y < partitions; y++) {
        let lowerLat = lowerLeftLat + ((upperRightLat - lowerLeftLat) / partitions) * y
        let upperLat = lowerLeftLat + ((upperRightLat - lowerLeftLat) / partitions) * (y + 1)
        for (let x = 0; x < partitions; x++) {
            let lowerLong = lowerLeftLong + ((upperRightLong - lowerLeftLong) / partitions) * x
            let upperLong = lowerLeftLong + ((upperRightLong - lowerLeftLong) / partitions) * (x + 1)

            let url = `https://ext-api.vasttrafik.se/pr/v4/positions?lowerLeftLat=${lowerLat}&lowerLeftLong=${lowerLong}&upperRightLat=${upperLat}&upperRightLong=${upperLong}&limit=200`

            try {
                await authorizedFetch(url)
                    .then(res => {
                        const responseType = res.headers.get('Content-Type')
                        if (!responseType?.includes('application/json')) {
                            console.warn(`Expected response type JSON, but got ${responseType}`)
                            res.text().then(text => console.log(`Raw response: ${text}`))
                        } else {
                            let j = res.json()
                            promises.push(j)
                            return j
                        }
                    })
                    .then(data => {
                        if (data.length == 200) {
                            console.warn(`[WARN] Position request limit possibly exceeded`)
                        }
                        positionData = Array.prototype.concat(positionData, data)
                    })
            } catch (error) {
                console.log('Failed to fetch map data')
                console.error(error)
            }
        }
    }

    await Promise.all(promises)
    console.log('Total vehicles: ' + positionData.length)
    return positionData
}

function getJourneyDetails(detailsReference) {
    return new Promise(resolve => {
        const url = `https://ext-api.vasttrafik.se/pr/v4/journeys/${detailsReference}/details`
        authorizedFetch(url)
            .then(res => {
                return res.json()
            })
            .then(json => {
                resolve(json)
            })
    })
}

module.exports = API
