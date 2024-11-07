const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "hospitalDB";

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

module.exports = connectDB;
