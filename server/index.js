const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser'); 
/**
 * create express application
 */
const app = express();
const port = 3000;

const user = require("./user")
const post = require("./post")

app.use(bodyParser.json());
app.use(cookieParser()); 

app.use(user.ROUTE_PATH, user.route)

app.use((req, res, next) => {
  const id = req.cookies.userId;
  if(!id) {
    res.status(302).send("please login")
  }
  next();
})

// private method
app.use(post.ROUTE_PATH, post.route)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
