const { MongoClient, ObjectId, CURSOR_FLAGS } = require("mongodb");

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
      record.favs = []
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

  mydb.editItem = async (record) => {
    console.log('enter edit item')
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection("recipe");
      console.log(record._id)
      const objId = ObjectId(`${record._id}`)
      await col.deleteOne({ _id: objId }) // may cause chaos here
      record._id = objId
      const res = await col.insertOne(record)
      console.log("Updated", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  mydb.editItemFav = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection("user");

      // retrive the current list
      const curFav = await col.findOne({ email: query.email })
      console.log(curFav.favs)
      if (query.favorite == true) {
        if (curFav.favs.includes(query.id)) {
          console.log("Alreay existed")
        }

        const res = await col.updateOne(
          { email: query.email },
          { $push: { favs: query.id } }
        )
        return res;
      } else {
        let newFav = curFav.favs
        let index = newFav.indexOf(query.id);
        if (index !== -1) {
          newFav.splice(index, 1);
        }
        const res = await col.updateOne(
          { email: query.email },
          { $set: { favs: newFav } }
        )
        return { res };
      }
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  mydb.editItemPublic = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection("recipe");
      const objId = ObjectId(`${query.id}`)
      const visibility = query.public
      const res = await col.findOneAndUpdate(
        { _id: objId },
        { $set: { public: visibility } })
      console.log("Public Updated", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  mydb.editItemTags = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection("recipe");
      const objId = ObjectId(`${query.id}`)
      const res = await col.findOneAndUpdate(
        { _id: objId },
        { $set: { tags: query.newTags } })
      console.log("Tags Updated", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  mydb.getAllPublicItems = async () => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection("recipe");
      const res = await col.find({ public: true }).toArray()
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  mydb.getFavByUser = async (email) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection("user");
      // TODO
      // recheck if a recipe is public when calling this api
      const res = await col.findOne({ email: email })
      return res.favs;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };



  return mydb
}
module.exports = db();
