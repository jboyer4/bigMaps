const http = require('http');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
//require('dotenv').config(); //use to test locally

const app = express();
const port = process.env.PORT || 3000;
const key = process.env.BING_KEY;
const baseURL = `http://dev.virtualearth.net/REST/V1/Routes/Walking`;
const options = `&optmz=distance&output=xml&key=${key}`

app.get('/', cors(), function(req, res) {
    const port = process.env.PORT || 3000;
    res.writeHead(200, { 'Content-Type': 'text' });
    res.end("Success");
});

app.get('/test', cors(), function(req, res) {
    const path = `?wp.0=Eiffel%20Tower&wp.1=louvre%20museum`;
    const url = baseURL + path + options;
    axios.get(url).then(response => {
        console.log(response.status);
        res.writeHead(200, { 'Content-Type': 'text' });
        res.end(JSON.stringify(response.data));
    });

});

app.get('/gps/:startlat/:startlong/:endlat/:endlong', cors(), function(req, res) {
    const startWaypoint = `?wp.0=${req.params.startlat},${req.params.startlong}`
    const endstartWaypoint = `&wp.1=${req.params.endlat},${req.params.endlong}`;;
    const url = baseURL + startWaypoint + endstartWaypoint + options;
    axios.get(url).then(response => {
        console.log(response.status);
        res.writeHead(200, { 'Content-Type': 'text' });
        res.end(JSON.stringify(response.data));
    });
});

app.get('/address/:start/:end', cors(), function(req, res) {
    const path = `?wp.0=${req.params.start}&wp.1=${req.params.end}`;
    const url = baseURL + path + options;
    axios.get(url).then(response => {
        console.log(response.status);
        res.writeHead(200, { 'Content-Type': 'text' });
        res.end(JSON.stringify(response.data));
    });
});

app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');