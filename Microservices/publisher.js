// Require HTTP to run server on localhost
const http = require("http");
// Require axios to make HTTP request with a promise based API
const axios = require('axios');
// Require URL to split get parameters
const url = require('url');

// Publisher http://localhost:8080
http.createServer(function(req, res) {
    const params = url.parse(req.url, true).query;

    function getRand() {
        return Math.floor((Math.random() * 20) + 1) * 1000;
    }

    function publish() {
        axios.get('http://localhost:8082/', {
            params: {
                action: 'publish',
                pubName: params['pubName']
            }
        }).catch(function(error) {
            console.log('Error: ' + error);
            res.end();
        })
        setTimeout(publish, getRand());
    }
    switch (params['action']) {
        // Received a publish event from the event handler
        case 'publish':
            setTimeout(publish, getRand());
            break;
        default:
            console.log("Publisher didn't receive an action!");
            res.end();
            break;
    }
}).listen(8080);
