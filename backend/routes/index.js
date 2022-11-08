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
module.exports = router;
