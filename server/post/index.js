const crypto = require('crypto');
const express = require("express");
const validator = require("validator");
const getDB = require("../db");


const route = express.Router()


/**
 * @typedef {object} Post
 * @property {string} id 
 * @property {string} userId 
 * @property {string} text 
 * @property {string[]} pictures
 * @property {string} date
 * 
 */


/**
 * 
 * @param {Post} body
 * @param {boolean} enforce
 * @returns {Post}
 */
function validatePost(body, enforce) {
  if(!body) {
    throw new Error("Invalid body");
  }

  const { id, text, pictures, date, userId } = body;
  if("string" !== typeof text) {
    throw new Error("Invalid text");
  }

  if("string" !== typeof userId) {
    throw new Error("invalid userId")
  }

  if(pictures && !Array.isArray(pictures)) {
    throw new Error("Invalid media");
  }

  const sPictures = pictures.map((m) => {
    if(!validator.isURL(m)) {
      throw new Error("Invalid url");
    }
    return m;
  })

  return {
    id: id || crypto.randomBytes(8).toString("hex"),
    userId,
    pictures: sPictures,
    text: text,
    date: date || new Date().toUTCString()
  }
}

route.get("/", async (req, res) => {
  const { query: { offset }} = req;
  const db = await getDB();
  const posts = await db.post.findAll({ 
    include: "user",
    limit: 7,
    offset: parseInt(offset) || undefined
  });
  res.json(posts.map(p => p.toJSON()));
});




route.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if("string" !== typeof id || id.length !== 16) {
    next();
    return;
  }
  const db = await getDB();
  const post = await db.post.findOne({ 
    where: { id },
    include: "user"
  });
  if(post) {
    res.json(post.toJSON());
    return;
  }
  next();
});


route.post("/", async (req, res) => {
  const { body } = req;
  //const { userId } = req.cookies;
  
  const userId = "95c1cb7df28db479";
  try {
    const post = validatePost({ ...body, userId });
    const db = await getDB();
    const newPost = await db.post.create(post);
    res.json(newPost);
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

route.patch("/:id", async (req, res, next) => {
  const { body, params: { id }, cookies: { userId } } = req;
  try {
    const db = await getDB();
    const oldPost = await db.post.findOne({ where: { id }, json: true });
    
    if(!oldPost) {
      return next()
    }
    
    if( userId !== oldPost.userId) {
      return res.status(403).status({
        error: "not permitted"
      })
    }
    
    const updatedPost = validatePost({ ...oldPost.toJSON(), ...body,  });
    const [_result, posts] = await db.post.update(updatedPost, { 
      where: { id }, 
      returning: true,
    });
    res.json(posts[0].toJSON());
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

route.delete("/:id", async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const db = await getDB();
    const count = await db.post.destroy({ 
      where: { id }
    });
    if(count === 0) {
      return next()
    }
    res.send("OK");
  } catch(e) {
    res.status(422).json({
      error: e.message,
    })
  }
})

const ROUTE_PATH = "/post"

module.exports = {
  route,
  ROUTE_PATH
}


