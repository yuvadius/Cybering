// Require axios to make HTTP request with a promise based API
const axios = require('axios');
// Require all scripts to run them on localhost
const publisher = require('./publisher.js'); // Publisher http://localhost:8080
const subscriber = require('./subscriber.js'); // Subscriber http://localhost:8081
const eventHandler = require('./eventHandler.js'); // Event Handler http://localhost:8082

// Boot
async function boot() {
    try {
        await axios('http://localhost:8082/?action=reset'); // Reset pubsub database
        await axios('http://localhost:8082/?action=addPublisher&pubName=pub1');
        await axios('http://localhost:8082/?action=addSubscriber&subName=sub1&pubName=pub1');
        // Uncomment to check more tests
        // await axios('http://localhost:8082/?action=addPublisher&pubName=pub2');
        // await axios('http://localhost:8082/?action=addSubscriber&subName=sub2&pubName=pub1');
        // await axios('http://localhost:8082/?action=addSubscriber&subName=sub3&pubName=pub2');
        // await axios('http://localhost:8082/?action=unsubscribe&subName=sub2&pubName=pub1');
    } catch (error) {
        console.log('ERROR: ' + error);
    }
}

boot();