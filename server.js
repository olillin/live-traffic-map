const express = require('express');
const path = require('path');
const fs = require('fs');
const oauth2 = require('@badgateway/oauth2-client');
require('dotenv').config();

const app = express();

if (!(process.env.CLIENT_ID && process.env.CLIENT_SECRET)) {
    console.error("Missing credentials!");
    process.exit();
}

const client = new oauth2.OAuth2Client({
    server: "https://ext-api.vasttrafik.se/pr/v4/",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    tokenEndpoint: "/token"
});

async function fetch_map_data() {
    const lowerLeftLat = 56.1496278;
    const lowerLeftLong = 10.2134046;
    const upperRightLat = 60.670150574324886;
    const upperRightLong = 17.148177023103646;
    let token = await client.clientCredentials()
    
    let sumData = []
    let promises = []
    const partitions = 6
    for (let y = 0; y < partitions; y++) {
        let lowerLat = lowerLeftLat + ((upperRightLat-lowerLeftLat)/partitions)*y
        let upperLat = lowerLeftLat + ((upperRightLat-lowerLeftLat)/partitions)*(y+1)
        for (let x = 0; x < partitions; x++) {
            let lowerLong = lowerLeftLong + ((upperRightLong-lowerLeftLong)/partitions)*x
            let upperLong = lowerLeftLong + ((upperRightLong-lowerLeftLong)/partitions)*(x+1)

            let url = `https://ext-api.vasttrafik.se/pr/v4/positions?lowerLeftLat=${lowerLat}&lowerLeftLong=${lowerLong}&upperRightLat=${upperLat}&upperRightLong=${upperLong}&limit=200`
    
            try {
                await fetch(url, {
                        method: 'get',
                        headers: {
                            'Authorization': 'Bearer ' + token.accessToken
                        }
                    })
                    .then(req => {
                        let j = req.json();
                        promises.push(j);
                        return j;
                    })
                    .then(data => {
                        if (data.length == 200) {
                            console.warn(`[WARN] Position request limit possibly exceeded`);
                        }
                        sumData = Array.prototype.concat(sumData, data);
                    });
            } catch(error) {
                console.log("Failed to fetch map data");
                console.error(error);
            }
        }
    }

    await Promise.all(promises);
    console.log("Total vehicles: " + sumData.length);
    return sumData;
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/livemap/data", (req, res) => {
    fetch_map_data().then(data => {
        res.send(data);
    });
});

const whitelist = ["style.css", "script.js"];
whitelist.forEach(file => {
    app.get("/" + file, (req, res) => {
        res.sendFile(path.join(__dirname, file));
        res.statusCode = 200;
    });
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Started server at http://localhost:${port}`);
