const { MongoClient } = require('mongodb');
require('dotenv').config();

const state = {
    db: null,
    isConnected: false,
};

const mongoUrl = process.env.mongoUrl;

const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
    try {
        await client.connect();
        const db = client.db('Stake');
        state.db = db;
        state.isConnected = true;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

const get = () => state.db;

const isConnected = () => state.isConnected;

module.exports = {
    connect,
    get,
    isConnected,
};
