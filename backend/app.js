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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;

