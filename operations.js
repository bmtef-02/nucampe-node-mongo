const assert = require('assert').strick;

// method to insert document
exports.insertDocument = (db, document, collection, callback) => {
    
    // allows us to access a specific collection in the mongodb server
    const coll = db.collection(collection);

    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
}

// method to list all documents
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });

}

// method to remove a document
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
}

// method to update a document
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    
    // $set is a mongodb set operator that uses the update object to write over existing info
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
}