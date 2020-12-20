const crypto = require('crypto');
const express = require("express");
const validator = require("validator");
const route = express.Router()

const INITIAL_PROFILE_PICTURE = "https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s32-c-mo";

const users = [{
  id: "1234567890ab",
  firstName: "Yaki",
  lastName: "Klein",
  email: "klein.yaki@gmail.com",
  profilePicture: "https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s32-c-mo",
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
 * @param {object} body 
 * @param {string} body.firstName 
 * @param {string} body.lastName
 * @param {string} body.email
 * @returns {user}
 */
function validateUser(body) {
  if(!body) {
    throw new Error("Invalid body");
  }

  const { email, firstName, lastName } = body;
  if(!validator.email(email)) {
    throw new Error("Invalid email");
  }

  if("string" !== typeof firstName) {
    throw new Error("Invalid firstName");
  }

  if("string" !== typeof firstName) {
    throw new Error("Invalid firstName");
  }
  return {
    id: crypto.randomBytes(64),
    email,
    firstName,
    lastName,
    profilePicture: INITIAL_PROFILE_PICTURE
  }
}

route.post("/", (req, res) => {
  const { body } = req;
  try {
    const user = validateUser(body);
    users.push(user);
    res.json(user);
  } catch(e) {

  }
})

const ROUTE_PATH = "/user"

module.exports = {
  route,
  ROUTE_PATH
}