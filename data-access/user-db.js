function makeUserDb ({ ObjectId, makeDb }) {
    async function findAll() {
        const db = await makeDb();
        const cursor = await db.collection('user').find();
        return (await cursor.toArray()).map(({_id: id, ...found}) => ({
            id,
            ...found,
        }));
    }

    async function findById({ id: _id }) {
        const db = await makeDb();
        _id = ObjectId(_id);
        const cursor = await db.collection('user').find({ _id });
        const result = await cursor.toArray();
        if (result.length === 0) return null;
        const { _id: id, ...info } = result[0];
        return { id, ...info };
    }

    async function findByUsername({ uname }) {
        const db = await makeDb();
        const cursor = await db.collection('user').find({ username: uname });
        const result = await cursor.toArray();
        if (result.length === 0) return null;
        const { username, ...info } = result[0];
        return { username, ...info };
    }

    async function insert({ id: _id = new ObjectId(), ...info }) {
        const db = await makeDb();
        const result = await db
            .collection('user')
            .insertOne({ _id, ...info });
        const { _id: id, ...insertedInfo } = result.ops[0];
        return { id, ...insertedInfo };
    }

    async function remove({ id: _id }) {
        const db = await makeDb();
        _id = ObjectId(_id);
        const result = await db
            .collection('user')
            .deleteOne({ _id });
        return result.deletedCount;
    }

    async function update({ id: _id, ...info }) {
        const db = await makeDb();
        _id = ObjectId(_id);
        const result = await db
            .collection('user')
            .updateOne({ _id }, { $set: { ...info, lastModified: Date.now() } });
        return result.modifiedCount > 0 ? { id: _id, ...info } : null;
    }

    return Object.freeze({
        findAll,
        findById,
        findByUsername,
        insert,
        remove,
        update,
    });
}

module.exports = { makeUserDb };