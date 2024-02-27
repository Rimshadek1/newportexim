const { MongoClient } = require("mongodb");
require("dotenv").config();

const state = {
    db: null,
};

// Ensure your .env file contains a correct mongoUrl like this:
mongoUrl = "mongodb+srv://hidhmatgroups:MZ3GP9k0bh4EloCt@cluster0.m9ywub2.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient object
const client = new MongoClient(mongoUrl);

// Function to establish a MongoDB connection
const connect = async (cb) => {
    try {
        await client.connect();
        const db = client.db("Stake");

        state.db = db;
        cb();
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        cb(err);
    }
};

// Function to get the database instance
const get = () => state.db;

// Export functions
module.exports = {
    connect,
    get,
};
