const { ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const express = require('express');
const { userDb, dbService } = require('./data-access');

const app = express();
dotenv.config();

app.use(express.json());

app.listen(3000, async () => {
    console.log('jAuth server up and running on port 3000.');
});