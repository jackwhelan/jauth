const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const { makeUserDb } = require('./user-db');

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const connectionString = process.env.DB_CONNECTION_STRING;
const databaseName = process.env.DEFAULT_DATABASE_NAME;

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function makeDb() {
    if(!client.isConnected()) await client.connect();
    return client.db(databaseName);
}

const userDb = makeUserDb({ObjectId, makeDb});

const dbService = Object.freeze({
    makeDb,
    userDb,
});

module.exports = {
    dbService,
    userDb,
}