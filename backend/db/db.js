const { MongoClient, ObjectId } = require("mongodb");

const db = () => {
  const mydb = {};
  const mongoString = "mongodb://127.0.0.1:27017";

  const url = process.env.MONGO_URL || mongoString;
  console.log("db url", url);
  const DB_NAME = "pocketrecipe";

  mydb.userLogin = async (user) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("user");
      // to validate username and password
      const existance = await userCol.findOne({ email: `${user.email}` });
      if (existance == undefined) {
        throw "No such user";
      }
      if (existance.password != user.password) {
        throw "wrong password";
      }
      let res = {};
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  mydb.createUser = async (user) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("user");
      let record = {};
      record.email = user.email;
      record.password = user.password;
      // check email duplication
      const existance = await userCol
        .find({ email: `${record.email}` })
        .toArray();
      console.log(existance);
      if (existance.length > 0) {
        throw "User already registered";
      }
      const res = await userCol.insertOne(record);
      console.log("Inserted", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  mydb.createItem = async (record) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const repCol = db.collection("recipe");
      const res = await repCol.insertOne(record);
      console.log("Inserted", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  // needs to lookup both collections
  mydb.getFavByUser = async (email) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const repCol = db.collection("recipe");
      const res = await repCol.insertOne(record);
      console.log("Inserted", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };



  return mydb;
}





module.exports = db();
