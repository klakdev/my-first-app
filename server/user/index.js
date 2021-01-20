const crypto = require('crypto');
const express = require("express");
const validator = require("validator");


/**
 * 
 * @param {User} body
 * @returns {User}
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

function init(db) {
  const route = express.Router();
  route.get("/:id", async (req, res, next) => {
    const { id } = req.params;
  
    if("string" !== typeof id || id.length !== 16) {
      next();
      return;
    }
  
    const user = await db.user.findById(id);
    if(user) {
      res.json(user.toJSON());
      return;
    }
    next();
  });
  
  route.post("/", async (req, res) => {
    const { body } = req;
    try {
      const userData = validateUser(body, false);
  
      const user = await db.user.create(userData);
      res.cookie("userId", user.id, {
        httpOnly: true,
        secure: true,
      });
      res.json(user);
    } catch(e) {
      res.status(422).json({
        error: e.message,
      })
    }
  })
  
  route.patch("/:id", async (req, res, next) => {
    const { body, params: { id } } = req;
    try {

      const oldUser = await db.user.findOne({ where: { id }, json: true });
      if(!oldUser) {
        return next()
      }
  
      const updatedUser = validateUser({ ...oldUser.toJSON(), ...body }, false);
      const user = await db.user.update(updatedUser, Object.keys(body))
  
      res.json(user);
    } catch(e) {
      res.status(422).json({
        error: e.message,
      })
    }
  })
  
  route.delete("/:id", async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const success = await db.user.delete(id);
      if(success) {
        return next()
      }
      res.send("OK");
    } catch(e) {
      res.status(422).json({
        error: e.message,
      })
    }
  })

  return route;
}


const ROUTE_PATH = "/user"

module.exports = {
  init,
  ROUTE_PATH
}