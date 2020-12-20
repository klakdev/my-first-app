const crypto = require('crypto');
const express = require("express");
const validator = require("validator");
const route = express.Router()

const users = [{
  id: "1234567890abcdef",
  firstName: "Yaki",
  lastName: "Klein",
  email: "klein.yaki@gmail.com",
  profilePicture: "https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s32-c-mo"
}];


route.get("/:id", (req, res, next) => {
  const user = users.find(user => user.id === req.params.id);
  if(user) {
    res.json(user);
    return;
  }
  next();
});


/**
 * @typedef {object} User
 * @property {string} id 
 * @property {string} firstName 
 * @property {string} lastName
 * @property {string} email
 * @property {string} profilePicture
 * 
 */

/**
 * 
 * @param {user} body
 * @returns {user}
 */
function validateUser(body, enforce) {
  if(!body) {
    throw new Error("Invalid body");
  }

  const { email, firstName, lastName, id, profilePicture } = body;
  if(enforce && !email || email && !validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if(enforce && !firstName || firstName && "string" !== typeof firstName) {
    throw new Error("Invalid firstName");
  }

  if(enforce && !lastName || lastName && "string" !== typeof lastName) {
    throw new Error("Invalid lastName");
  }
  return {
    id: id || crypto.randomBytes(8).toString("hex"),
    email,
    firstName,
    lastName,
    profilePicture: profilePicture || null
  }
}

route.post("/", (req, res) => {
  const { body } = req;
  try {
    const user = validateUser(body, false);
    users.push(user);
    res.json(user);
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

route.patch("/:id", (req, res, next) => {
  const { body } = req;
  try {
    const userIndex = users.findIndex(user => user.id === req.params.id);
    if(userIndex < 0) {
      return next()
    }
    const { id } = req.params;
    const updatedUser = validateUser({ ...users[userIndex], ...body, id }, false);
    users.splice(userIndex, 1, updatedUser);
    res.json(updatedUser);
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

route.delete("/:id", (req, res, next) => {
  const { body } = req;
  try {
    const userIndex = users.findIndex(user => user.id === req.params.id);
    if(userIndex < 0) {
      return next()
    }
    users.splice(userIndex, 1);
    res.send("OK");
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

const ROUTE_PATH = "/user"

module.exports = {
  route,
  ROUTE_PATH
}