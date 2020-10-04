// Require HTTP to run server on localhost
const http = require("http");
// Require firebase(Real Time Database)
const admin = require("firebase-admin");
// Require axios to make HTTP request with a promise based API
const axios = require('axios');
// Require URL to split get parameters
const url = require('url');

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "onethousand-1000",
        "private_key_id": "3fb0f6a092eeb5b448a72c3dc312d088ae79a584",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFzbQFhjQHCafS\nRYlqUVC5MxEQm2Qv7+qUeUymjqH7abl19Bul0TtF1iJMSlzsykBvhmfDlJehBUy/\nZmMqHRYDrdByM3iTImselFGJF0bwJrJg/n5Dl9jmXku9iClQsD96FySbp60pm/4Z\n/qmD2f8K5t9MRhPrfyTmnyZOG4g9VYtewc8tVSpYWJsKwdX68sYZXiEQDoLU1GXz\n256KXrkQ/oahK5uLgsx2uwnyN3JArZrCbKOqPMmWP2O13T73qxC8MvcSLL715qNV\n3CSJc8XuzqZEgLWgLFd4oX5gqpZjn3cdtBPVEWaghLdqyGKkMi1f85VNbJ564Vzf\nQEfpcCFxAgMBAAECggEAB675K1eKaYyMBOq+Ejs+6NGmRVc9BLUw2euQw6A9bEHl\nFuFIjKg0EIW0RMAA786J7nWQBBbGccZLgtKy91ZB/z5WEdbDkeRoNRJ0j6wk5FG+\njMwUbVZ9C7aGwCifYb0rOfw1+5PAgXsOF4lMi/Ai4YoCMN+10WBE2tLxCMtzMn1f\nsMpAzukOsSbbcOrk2H5BWxgx+mF//zRX8bjMcUp+Qiu58zyf1Sm5c0418fiZZ1+l\njjifkR3uLSVAZNUbFWA1DgHKd/U5z6+3qVsaA/kyQO/soT1/nkXJ/eROTRYaOTXR\nVLP18GlPxrBDuFANIX7dTH29pN3S/93/UFy/9NWVGQKBgQC5gHISinlYCe2Rwxoe\n3xYITWWdGP8ispfUu+5O9JN6OPBimtF8Sj27jt5NhGrPuPYHj6B6YZoHgPBeZetD\n/fHHyhHWAMBwmc6/V1USJ4JVBR8joTExDMKw1ONZMiLP5gsgctMXDDIvMuL/TRH/\ncMk+33xf86UQhqr2bKyvOxJIOQKBgQC4p4Nv3CK0QD+ufdsj+wIfU/Szgjrx2lQ6\nwWVEw2IGou3y2I7ryKI+Je6GN+d+8mjMqYeiCRwpPrtSI8WrHdMjiPdbBk4PQaN1\n9dqJnXmrVh7t269xAB8WTBuHdVU86Ft+P2GLEM6shewKrMyx2bZFn/vNt57vrthe\nwN4uG3Ly+QKBgFe73DfQrltpNqc981iugikjEfAfJmwus4i16ZwGKMohq++28WUr\nZ88RXyqiejIMdLBWybuX9dWeshCze3YI4RVxCMaCTIH0/Meacm3Hqei0J2oejrl4\nI4ym43AIOlbBonmSVSwNZJ7WHm5I8T4zBbtqz9RB08vhJXKvK20lLxxhAoGABRJU\nwdXB/kFlfl1mj25teH7N0cBZ7hqZBaQaK/FR1+zRrEHWaxNvoVVZX8ZZTVtLFZPy\nbbjiVR+r9W2WGEURb4Brisx5iGG9I5hFEFKK7PHIl6/Y+bmPIQWmG+pVFP8sxCLp\ngvBLPOHQwdpNJPVd1Du4psXMT7j1qGSTtaB7X8ECgYEAsxtBPN3UqlpsnlYMSuDk\nVZRjMR2kI/qbkj2gm9Ea1n1Qz6LDf/DCA/C+KRx/4ovE2i6pxXSqU/6KEkdbyEhn\n+b6Ak2y8wL1tQpKPzeLP8t5B/QA1AfWKvIt//UX7PyAe3Kw19nnLInLF8V3uIa3N\n/mq6qk3oWzqe59fT27CzU2Y=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-axg8z@onethousand-1000.iam.gserviceaccount.com",
        "client_id": "106929498157047262213",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-axg8z%40onethousand-1000.iam.gserviceaccount.com"
    }),
    databaseURL: "https://onethousand-1000.firebaseio.com"
});

const db = admin.database();

// Event Handler http://localhost:8082
http.createServer(function(req, res) {
    const params = url.parse(req.url, true).query;
    db.ref('/pubsub').once('value').then(function(snapshot) {
        const snapshotVal = snapshot.val();
        const pubsub = snapshotVal ? snapshotVal : {};
        switch (params['action']) {
            // Received a publish event from the publisher
            case 'publish':
                const promises = [];
                for (const [sub, pubs] of Object.entries(pubsub)) {
                    if (pubs.includes(params['pubName'])) {
                        promises.push(axios.get('http://localhost:8081/', {
                            params: {
                                action: 'publish',
                                pubName: params['pubName'],
                                subName: sub
                            }
                        }));
                    }
                }
                if (promises.length == 0) { // Publisher not attached to any subscriber
                    res.end();
                }
                else {
                    axios.all(promises).then(function(response) {
                        res.end();
                    }).catch(function(error) {
                        console.log('Error: ' + error);
                        res.end();
                    })
                }
                break;
            // Received an addPublisher event from the client
            case 'addPublisher':
                axios.get('http://localhost:8080/', {
                    params: {
                        action: 'publish',
                        pubName: params['pubName']
                    }
                })
                // Publisher hangs and does not return so we shouldn't wait for the promise
                console.log("Added Publisher " + params['pubName']);
                res.end();
                break;
            // Received an addSubscriber event from the client
            case 'addSubscriber':
                if (!pubsub[params['subName']]) {
                    pubsub[params['subName']] = [];
                }
                if (!pubsub[params['subName']].includes(params['pubName'])) {
                    pubsub[params['subName']].push(params['pubName']);
                }
                db.ref('/pubsub').set(pubsub).then(function(response) {
                    console.log("Subscriber " + params['subName'] + " subscribed to " + params['pubName']);
                    res.end();
                }).catch(function(error) {
                    console.log('Error: ' + error);
                    res.end();
                });
                break;
            // Received an unsubscribe event from the client
            case 'unsubscribe':
                if (!pubsub[params['subName']] || !pubsub[params['subName']].includes(params['pubName'])) {
                    console.log('Subcriber ' + params['subName'] + ' Does not exist or isn\'t subscribed to ' + params['pubName']);
                    res.end();
                }
                else {
                    pubsub[params['subName']].splice(pubsub[params['subName']].indexOf(params['pubName']), 1);
                    db.ref('/pubsub').set(pubsub).then(function(response) {
                        console.log("Subscriber " + params['subName'] + " unsubscribed from " + params['pubName']);
                        res.end();
                    }).catch(function(error) {
                        console.log('Error: ' + error);
                        res.end();
                    });
                }
                break;
            // Received a reset event from the client
            case 'reset':
                db.ref('/pubsub').set({}).then(function(response) {
                    res.end();
                }).catch(function(error) {
                    console.log('Error: ' + error);
                    res.end();
                });
                break;
            default:
                console.log("Event Handler didn't receive an action!");
                res.end();
                break;
        }
    });
}).listen(8082);
