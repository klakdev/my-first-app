const crypto = require('crypto');
const express = require("express");
const validator = require("validator");
const getDB = require("../db");


const route = express.Router();

/**
 * @typedef {object} User
 * @property {string} id 
 * @property {string} firstName 
 * @property {string} lastName
 * @property {string} email
 * @property {string} profilePicture
 * @property {string} birthday
 * 
 */

/**
 * this is an in memory array used for demonstrating the behavior of th different apis
 * @type {User[]} users
 */
const users = [];

/**
 * 
 * @param {user} body
 * @returns {user}
 */
function validateUser(body, enforce) {
  if(!body) {
    throw new Error("Invalid body");
  }

  const { email, firstName, lastName, id, profilePicture, birthday } = body;
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
    profilePicture,
    birthday
  }
}

route.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  //for in memory usage
  //const user = users.find(user => user.id === req.params.id);
  if("string" !== typeof id || id.length !== 16) {
    next();
    return;
  }

  const db = await getDB();
  const user = await db.user.findOne({ where: { id } });
  if(user) {
    res.json(user.toJSON());
    return;
  }
  next();
});


route.post("/", async (req, res) => {
  const { body } = req;
  try {
    const user = validateUser(body, false);
    //for in memory usage
    //users.push(user);
    const db = await getDB();
    const newUser = await db.user.create(user);
    res.cookie("userId", newUser.id);
    res.json(newUser);
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

route.patch("/:id", async (req, res, next) => {
  const { body, params: { id } } = req;
  try {
    const db = await getDB();
    const oldUser = await db.user.findOne({ where: { id }, json: true });
    if(!oldUser) {
      return next()
    }

    const updatedUser = validateUser({ ...oldUser.toJSON(), ...body }, false);
    //for in memory usage
    //users.splice(userIndex, 1, updatedUser);
    const [_result, users] = await db.user.update(updatedUser, { 
      where: { id }, 
      returning: true,
      fields: Object.keys(body)
    });
    res.json(users[0].toJSON());
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

route.delete("/:id", async (req, res, next) => {
  const { params: { id } } = req;
  try {
    //in memory db
    //const userIndex = users.findIndex(user => user.id === req.params.id);
    const db = await getDB();
    const user = await db.user.destroy({ 
      where: { id }
    });
    if(user === 0) {
      return next()
    }
    //users.splice(userIndex, 1);
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