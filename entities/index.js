const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const { buildMakeUser } = require('./user');

const makeUser = buildMakeUser({ ObjectId });

const entityService = Object.freeze({
    makeUser,
});

module.exports = {
    entityService,
    makeUser,
}
