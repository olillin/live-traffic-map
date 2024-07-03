var map
var markersLayer = L.layerGroup()
var routesLayer = L.layerGroup()
var zonesLayer = L.layerGroup()
var markers = new Map()
window.addEventListener('load', () => {
    document.getElementById('markers_check')?.addEventListener('change', event => {
        if (event.currentTarget.checked) {
            map.addLayer(markersLayer)
        } else {
            map.removeLayer(markersLayer)
        }
    })
    document.getElementById('routes_check')?.addEventListener('change', event => {
        if (event.currentTarget.checked) {
            map.addLayer(routesLayer)
        } else {
            map.removeLayer(routesLayer)
        }
    })
    document.getElementById('zones_check')?.addEventListener('change', event => {
        if (event.currentTarget.checked) {
            map.addLayer(zonesLayer)
        } else {
            map.removeLayer(zonesLayer)
        }
    })

    // Map stuff
    map = L.map('map').setView([58.9886382, 11.2966348], 11.5)
    markersLayer.addTo(map)
    zonesLayer.addTo(map)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    updateZones()
    updateVehicles()

    // drawPartitions()
    // drawTriplegs([
    //     {
    //         latitude: 57.659302,
    //         longitude: 12.126026,
    //         isOnTripLeg: true,
    //         isTripLegStart: true,
    //     },
    //     {
    //         latitude: 57.658888,
    //         longitude: 12.123212,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658933,
    //         longitude: 12.122151,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658843,
    //         longitude: 12.120668,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658655,
    //         longitude: 12.119509,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658169,
    //         longitude: 12.119545,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65781,
    //         longitude: 12.119257,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657702,
    //         longitude: 12.118924,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65754,
    //         longitude: 12.117819,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657459,
    //         longitude: 12.117873,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657333,
    //         longitude: 12.117243,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657055,
    //         longitude: 12.117468,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65701,
    //         longitude: 12.117369,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657028,
    //         longitude: 12.117486,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.656911,
    //         longitude: 12.117567,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.656758,
    //         longitude: 12.116875,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657216,
    //         longitude: 12.116497,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657342,
    //         longitude: 12.11656,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657171,
    //         longitude: 12.115814,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657055,
    //         longitude: 12.114538,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657153,
    //         longitude: 12.11238,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657252,
    //         longitude: 12.112191,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657171,
    //         longitude: 12.111994,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657252,
    //         longitude: 12.109225,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657333,
    //         longitude: 12.109216,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657252,
    //         longitude: 12.109225,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657171,
    //         longitude: 12.108524,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657252,
    //         longitude: 12.108065,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657135,
    //         longitude: 12.107904,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657037,
    //         longitude: 12.108146,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.655634,
    //         longitude: 12.108847,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.654511,
    //         longitude: 12.108281,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65336,
    //         longitude: 12.10785,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.653171,
    //         longitude: 12.107787,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65309,
    //         longitude: 12.107589,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.653027,
    //         longitude: 12.107661,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.653072,
    //         longitude: 12.10793,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.652964,
    //         longitude: 12.1082,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65194,
    //         longitude: 12.10971,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.651131,
    //         longitude: 12.110412,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.649387,
    //         longitude: 12.112443,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.648308,
    //         longitude: 12.113971,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.648128,
    //         longitude: 12.114385,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.648137,
    //         longitude: 12.115158,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.648389,
    //         longitude: 12.116075,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.64882,
    //         longitude: 12.117504,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.648838,
    //         longitude: 12.118358,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.647769,
    //         longitude: 12.120767,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.647715,
    //         longitude: 12.122367,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.64776,
    //         longitude: 12.123122,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.647661,
    //         longitude: 12.123392,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.647184,
    //         longitude: 12.123769,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646825,
    //         longitude: 12.123446,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646708,
    //         longitude: 12.122835,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646258,
    //         longitude: 12.121513,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.645396,
    //         longitude: 12.119868,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.645198,
    //         longitude: 12.119167,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.645027,
    //         longitude: 12.117989,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.644164,
    //         longitude: 12.115392,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.643094,
    //         longitude: 12.113648,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642941,
    //         longitude: 12.113189,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.643022,
    //         longitude: 12.113054,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.643022,
    //         longitude: 12.112955,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642915,
    //         longitude: 12.112821,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642941,
    //         longitude: 12.112299,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642906,
    //         longitude: 12.111086,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642726,
    //         longitude: 12.109971,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642708,
    //         longitude: 12.109288,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642915,
    //         longitude: 12.108317,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.643049,
    //         longitude: 12.108209,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.642968,
    //         longitude: 12.107975,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.643103,
    //         longitude: 12.106924,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.643301,
    //         longitude: 12.106429,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.643535,
    //         longitude: 12.106223,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.644056,
    //         longitude: 12.106151,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.644613,
    //         longitude: 12.106285,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.645207,
    //         longitude: 12.106411,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.645746,
    //         longitude: 12.106285,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646366,
    //         longitude: 12.105494,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646672,
    //         longitude: 12.104461,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646726,
    //         longitude: 12.104497,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646672,
    //         longitude: 12.104461,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646852,
    //         longitude: 12.103346,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.64687,
    //         longitude: 12.10207,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.646942,
    //         longitude: 12.101863,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.647283,
    //         longitude: 12.101854,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.647805,
    //         longitude: 12.101575,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.648137,
    //         longitude: 12.101584,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.648775,
    //         longitude: 12.101935,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.6506,
    //         longitude: 12.104685,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.651068,
    //         longitude: 12.105369,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.653027,
    //         longitude: 12.107661,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.653072,
    //         longitude: 12.10793,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.653171,
    //         longitude: 12.107787,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.653729,
    //         longitude: 12.108092,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.654511,
    //         longitude: 12.108281,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.655634,
    //         longitude: 12.108847,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657037,
    //         longitude: 12.108146,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657162,
    //         longitude: 12.108308,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657252,
    //         longitude: 12.109225,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657252,
    //         longitude: 12.109369,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657171,
    //         longitude: 12.109378,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657252,
    //         longitude: 12.109369,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657261,
    //         longitude: 12.109971,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657171,
    //         longitude: 12.111994,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657046,
    //         longitude: 12.112191,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657153,
    //         longitude: 12.11238,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657055,
    //         longitude: 12.114538,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657261,
    //         longitude: 12.116362,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657216,
    //         longitude: 12.116497,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657306,
    //         longitude: 12.116596,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65754,
    //         longitude: 12.117819,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657459,
    //         longitude: 12.117873,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657333,
    //         longitude: 12.117243,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657028,
    //         longitude: 12.117486,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.65701,
    //         longitude: 12.117369,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657055,
    //         longitude: 12.117468,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.656911,
    //         longitude: 12.117567,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.656758,
    //         longitude: 12.116875,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657216,
    //         longitude: 12.116497,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657306,
    //         longitude: 12.116596,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657576,
    //         longitude: 12.118034,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657702,
    //         longitude: 12.118924,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.657639,
    //         longitude: 12.119266,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658169,
    //         longitude: 12.119545,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658655,
    //         longitude: 12.119509,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658762,
    //         longitude: 12.119913,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658942,
    //         longitude: 12.121801,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.658861,
    //         longitude: 12.122628,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.659329,
    //         longitude: 12.126376,
    //         isOnTripLeg: true,
    //     },
    //     {
    //         latitude: 57.659302,
    //         longitude: 12.126026,
    //         isOnTripLeg: true,
    //         isTripLegStop: true,
    //     },
    // ])

    const updateButton = document.getElementById('update')
    updateButton.addEventListener('click', event => {
        updateButton.classList.add('updating')
        updateButton.innerHTML = 'Updating...'
        updateButton.disabled = true
        Promise.all([
            updateVehicles(), //
            updateZones(),
        ]).then(() => {
            updateButton.classList.remove('updating')
            updateButton.innerHTML = 'Update'
            updateButton.disabled = false
        })
    })
})

class Marker {
    constructor(response) {
        this._position = [response.latitude, response.longitude]
        this.color = response.line.backgroundColor
        this.name = response.name + ' ' + response.direction
        this._marker = L.circle(this._position, {
            color: this.color,
            fillColor: this.color,
            fillOpacity: 1,
            radius: 50,
        })
            .addTo(markersLayer)
            .bindPopup(this.name)

        // Linemarker
        fetch(`/api/details?detailsReference=${response.detailsReference}`)
            .then(res => {
                res.json()
            })
            .then(data => {
                this._lineMarker = L.polyline(data, { color: this.color }).addTo(routesLayer)
            })
    }

    set_position(position) {
        this._position = position
        if (this._visible) {
            this._marker.setLatLng(this._position)
        }
        return this
    }

    hide() {
        this._visible = false
        this._marker.remove()

        return this
    }

    show() {
        this._visible = true
        this._marker.addTo(markersLayer)
        this.set_position(this._position)

        return this
    }
}

function drawPartitions() {
    const lowerLeftLat = 56.1496278
    const lowerLeftLong = 10.2134046
    const upperRightLat = 60.670150574324886
    const upperRightLong = 17.148177023103646
    const partitions = 6
    for (let y = 0; y < partitions; y++) {
        let lowerLat = lowerLeftLat + ((upperRightLat - lowerLeftLat) / partitions) * y
        let upperLat = lowerLeftLat + ((upperRightLat - lowerLeftLat) / partitions) * (y + 1)
        for (let x = 0; x < partitions; x++) {
            let lowerLong = lowerLeftLong + ((upperRightLong - lowerLeftLong) / partitions) * x
            let upperLong = lowerLeftLong + ((upperRightLong - lowerLeftLong) / partitions) * (x + 1)

            L.rectangle(
                [
                    [lowerLat, lowerLong],
                    [upperLat, upperLong],
                ],
                { color: 'orange', weight: 1 }
            )
                .addTo(map)
                .bindPopup(x + ',' + y)
        }
    }
}

function updateVehicles() {
    return new Promise((resolve, reject) => {
        console.log('Updating...')
        fetch('/api/positions')
            .catch(() => {
                reject('Unable to update, please try again later')
            })
            .then(res => {
                if (res == undefined) {
                    return
                }
                return res.json()
            })
            .then(lines => {
                if (lines == undefined) {
                    return
                }
                console.log(lines)
                lines.forEach(line => {
                    let position = [line.latitude, line.longitude]

                    if (markers.has(line.detailsReference)) {
                        // Update marker position
                        markers.get(line.detailsReference).set_position(position)
                    } else {
                        // Create marker
                        let marker = new Marker(line)
                        markers.set(line.detailsReference, marker)
                    }
                })
                resolve(true)
            })
    })
}

function updateZones() {
    return new Promise(resolve => {
        console.log('Updating zones...')
        fetch('/api/zones')
            .then(res => res.json())
            .then(zones => {
                zones.forEach(zone => {
                    const rect = L.rectangle(
                        [
                            [zone[0], zone[1]],
                            [zone[2], zone[3]],
                        ],
                        {
                            color: '#ff7800',
                            fill: false,
                        }
                    ).addTo(zonesLayer)
                })
                resolve(true)
            })
    })
}
