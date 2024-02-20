const { MongoClient } = require("mongodb");
require("dotenv").config();

const state = {
    db: null,
};

// Ensure your .env file contains a correct mongoUrl like this:
const mongoUrl = process.env.mongoUrl;

// Create a new MongoClient object
const client = new MongoClient(mongoUrl);

// Function to establish a MongoDB connection
const connect = async (cb) => {
    try {
        await client.connect();
        const db = client.db("Stake"); // Make sure the database name matches your config

        // Set up database instance in the state
        state.db = db;
        cb(); // Callback after successful connection
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        cb(err); // Pass error to callback
    }
};

// Function to get the database instance
const get = () => state.db;

// Export functions
module.exports = {
    connect,
    get,
};
