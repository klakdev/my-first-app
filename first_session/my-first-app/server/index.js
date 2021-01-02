const express = require('express');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser'); 
const user = require("./user");
const post = require("./post");
const app = express()
const port = 3000


app.use(bodyParser.json());
app.use(cookieParser());
app.use(user.ROUTE_PATH, user.route);
app.use(post.ROUTE_PATH, post.route);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})