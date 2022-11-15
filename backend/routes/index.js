const express = require("express");
const router = express.Router();

const db = require("../db/db.js");

router.get("/user/login", async (req, res) => {
  try {
    let user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    await db.userLogin(user)
    res.send({
      val: 1,
      comment: "Successfully logged in"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.post("/user/create", async (req, res) => {
  try {
    let user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    await db.createUser(user)
    res.send({
      val: 1,
      comment: ""
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.post("/item/create", async (req, res) => {
  try {
    let record = {}
    record.user = req.body.email
    record.name = req.body.itemName //string
    record.description = req.body.description // array of strings
    record.prepTime = req.body.prepTime // TBD, min
    record.ingrident = req.body.ingrident // array of strings
    record.instruction = req.body.instruction // array of strings
    record.tags = req.body.tags // array of strings
    record.nutrition = req.body.nutrition // string
    record.public = req.body.public //boolean

    const dbRes = await db.createItem(record)
    // console.log(dbRes.insertedId.toString())
    res.send({
      id: dbRes.insertedId.toString(),
      val: 1,
      comment: "Successfully created new recipe"
    })

  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
})

router.post("/item/edit", async (req, res) => {
  try {
    let record = {}
    record._id = req.body.id
    record.user = req.body.email
    record.name = req.body.itemName //string
    record.description = req.body.description // array of strings
    record.prepTime = req.body.prepTime // TBD, min
    record.ingrident = req.body.ingrident // array of strings
    record.instructions = req.body.instructions // array of strings
    record.tags = req.body.tags // array of strings
    record.nutrition = req.body.nutrition // string
    record.public = req.body.public //boolean

    const dbRes = await db.editItem(record)
    res.send({
      id: dbRes.insertedId.toString(),
      val: 1,
      comment: "Edited!"
    })

  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
})

router.post("/item/fav", async (req, res) => {
  try {
    let query = {}
    query.email = req.body.email
    query.id = req.body.id
    query.favorite = req.body.favorite // boolean
    console.log(query);
    await db.editItemFav(query)
    res.send({
      val: 1,
      comment: "Successfully changed fav status"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
})

router.post("/item/pub", async (req, res) => {
  try {
    let query = {}
    query.email = req.body.email
    query.id = req.body.id
    query.public = req.body.public

    const dbRes = await db.editItemPublic(query)
    res.send({
      val: 1,
      comment: "Successfully changed public status"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
})

router.post("/item/tag", async (req, res) => {
  try {
    let query = {}
    query.id = req.body.id
    query.newTags = req.body.newTags
    const dbRes = await db.editItemTags(query)
    res.send({
      val: 1,
      comment: "operation done"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
})

router.get("/item/getAllPub", async (req, res) => {
  try {
    const dbRes = await db.getAllPublicItems()
    console.log(dbRes)
    res.send({
      val: 1,
      recipes: dbRes,
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.get("/item/getFav", async (req, res) => {
  try {
    const dbRes = await db.getFavByUser(req.query.email) // use req.query for params
    res.send({
      val: 1,
      favIds: dbRes,
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.get("/item/getByTag", async (req, res) => {
  try {
    let query = {}
    query.email = req.body.email
    query.tags = req.body.tags // parse / stringfy
    const dbRes = await db.getItemByTag(query)
    res.send({
      val: 1,
      recipes: dbRes
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.get("/item/getByUser", async (req, res) => {
  try {
    const dbRes = await db.getItemByUser(req.query.email)
    res.send({
      val: 1,
      recipes: dbRes
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.get("/item/delete", async (req, res) => {
  try {

    const dbRes = await db.deleteItem(req.body.id)
    res.send({
      val: 1,
      comment: "Successfully deleted recipe"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

module.exports = router;
