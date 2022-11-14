const express = require("express");
const router = express.Router();

const db = require("../db/db.js");
console.log(db)

router.get("/testdb", async (req, res) => {
  try {
    const dbRes = await db.testDB();
    res.send({
      val: 1,
      comment: "operation success",
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
});

router.post("/item/create", async (req, res) => {
  try {
    const dbRes = await db.createItem(req)
    res.send({
      id: dbRes.id,
      val: 1,
      comment: "operation"
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
    const dbRes = await db.editIterm(req)
    res.send({
      id: dbRes.id,
      val: 1,
      comment: "operation"
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
    const dbRes = await db.editIterm(req)
    res.send({
      id: dbRes.id,
      val: 1,
      comment: "operation"
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
    const dbRes = await db.editItemFav(req)
    res.send({
      val: 1,
      comment: "operation"
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
    const dbRes = await db.editItemPublicity(req)
    res.send({
      val: 1,
      comment: "operation"
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
    const dbRes = await db.editItemTags(req)
    res.send({
      val: 1,
      comment: "operation"
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
    const dbRes = await db.getAllPulicItem(req)
    res.send({
      val: 1,
      recipes: [], // TODO
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.get("/item/getByTag", async (req, res) => {
  try {
    const dbRes = await db.getItemByTag(req)
    res.send({
      val: 1,
      recipes: [], // TODO
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.get("/item/getByUser", async (req, res) => {
  try {
    const dbRes = await db.getItemByUser(req)
    res.send({
      val: 1,
      recipes: [], // TODO
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

router.get("/item/delete", async (req, res) => {
  try {
    const dbRes = await db.deleteItem(req)
    res.send({
      val: 1,
      recipes: [], // TODO
    })
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({ val: -1, err: e });
  }
})

module.exports = router;
