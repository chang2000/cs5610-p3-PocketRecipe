const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 5555;

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

var indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Static Hosting
// should only be used during production phase
app.use(express.static("../frontend/build"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;

