const http = require('http');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
//require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const key = process.env.BING_KEY;

app.get('/path', cors(), function(req, res) {
    const port = process.env.PORT || 3000;
    url = `http://dev.virtualearth.net/REST/V1/Routes/Walking?wp.0=Eiffel%20Tower&wp.1=louvre%20museum&optmz=distance&output=xml&key=${key}`
    axios.get(url).then(response => {
        console.log(response.status);
        res.writeHead(200, { 'Content-Type': 'text' });
        res.end(JSON.stringify(response.data));
    });

})

app.get('/', cors(), function(req, res) {
    const port = process.env.PORT || 3000;
    res.writeHead(200, { 'Content-Type': 'text' });
    res.end("Response");
});
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');