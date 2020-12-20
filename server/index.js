const express = require("express");
const bodyParser = require("body-parser");

/**
 * create express application
 */
const app = express();
const port = 3000;

const user = require("./user/index")

app.use(bodyParser.json());

app.use(user.ROUTE_PATH, user.route)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
