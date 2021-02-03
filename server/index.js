const express = require('express');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser'); 
var cors = require('cors');

const user = require("./user");
const post = require("./post");
const initDB = require("./db");


async function initServer() {

  const db = await initDB();
  //create a new express application
  const app = express()
  //get post for server to listen on
  const port = process.env.PORT || 3001

  app.use('*', cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
  }))
  //middleware for parsing the http body and cookie header
  app.use(bodyParser.json());
  app.use(cookieParser());



  //routes for handling users and posts
  app.use(user.ROUTE_PATH, user.init(db));
  app.use(post.ROUTE_PATH, post.init(db));

  //make application listen on requested port
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })

}

initServer().then(() => {
  console.log("exiting");
})

