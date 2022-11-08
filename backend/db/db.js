const { MongoClient, ObjectId } = require("mongodb");

const db = () => {
  const mydb = {};
  const mongoString = "mongodb://127.0.0.1:27017";

  const url = process.env.MONGO_URL || mongoString;
  console.log("db url", url);
  const DB_NAME = "champlist";

  mydb.testDB = async () => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      console.log('connected')
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };
  return mydb;
}

module.exports = db();
