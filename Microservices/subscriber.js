// Require HTTP to run server on localhost
const http = require("http");
// Require URL to split get parameters
const url = require('url');

// Subscriber http://localhost:8081
http.createServer(function(req, res) {
    const params = url.parse(req.url, true).query;
    switch (params['action']) {
        // Received a publish event from the event handler
        case 'publish':
            console.log("Alert from Crazy clock");
            res.end();
            break;
        default:
            console.log("Subscriber didn't receive an action!");
            res.end();
            break;
    }
}).listen(8081);
