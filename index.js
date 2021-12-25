// requires the mongodb node.js driver and imported the MongoClient object from it
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

// sets up a connection to the mongodb server using the port number
const url = 'mongodb://localhost:27017/';

// the name of the database connecting to
const dbname = 'nucampsite';

// use MongoClient's connect method to connect mongodb client to the mongodb server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    // connect method's callback gives a client object that we use to access the nucampsite database

    // checks if err is not null. If assert fails, app terminates.
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    // client.db method will connect to nucampsite database on mongodb server
    const db = client.db(dbname);

    // delete all documents in the campsite's collection so start with a blank collection every time we test
    db.dropCollection('campsites', (err, result) => {

        assert.strictEqual(err, null);
        // logs if collection was successfully dropped. Result should be true
        console.log('Dropped Collection', result);

        // recreate the campsites collection
        const collection = db.collection('campsites');

        // insert document in the collection
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, (err, result) => {
            assert.strictEqual(err, null);
            
            // ops will contain an array of the inserted document
            console.log('Insert Document:', result.ops);

            // log all documents in the collection. toArray() converts documents to an array of objects
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Document:', docs);

                // close client's connection to mongodb server
                client.close();
            });
        });

    });

});