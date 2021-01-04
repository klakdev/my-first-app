const express = require('express');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser'); 

const user = require("./user");
const post = require("./post");

//create a new express application
const app = express()
//get post for server to listen on
const port = process.env.PORT || 3001

//middleware for parsing the http body and cookie header
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
})

//routes for handling users and posts
app.use(user.ROUTE_PATH, user.route);
app.use(post.ROUTE_PATH, post.route);

//make application listen on requested port
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})