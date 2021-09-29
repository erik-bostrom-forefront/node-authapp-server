// const { MongoClient } = require('mongodb');
import {MongoClient} from 'mongodb';
const uri = process.env.DATABASE_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var _db;

const connectToServer = function (callback) {
    client.connect(function (err, db) {
        if (db) {
            _db = db.db('authAppDb');
        }
        return callback(err);
    });
};

const getDb = function () {
    if (_db) {
        return _db;
    }
}

export {connectToServer, getDb}