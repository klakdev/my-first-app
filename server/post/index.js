const crypto = require('crypto');
const express = require("express");
const validator = require("validator");
const getDB = require("../db");


const route = express.Router()


/**
 * 
 * @typedef {object} Media
 * @property {string} id 
 * @property {string} url 
 */
/**
 * @typedef {object} Post
 * @property {string} id 
 * @property {string} text 
 * @property {Media[]} media
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

  const { id, text, media, date } = body;
  if("string" !== typeof text) {
    throw new Error("Invalid text");
  }

  if(!Array.isArray(media)) {
    throw new Error("Invalid media");
  }

  const sMedia = media.map((m) => {
    const { url } = m;
    if(!validator.isURL(url)) {
      throw new Error("Invalid url");
    }
    return {
      id: crypto.randomBytes(8).toString("hex"),
      url,
    }
  })

  return {
    id: id || crypto.randomBytes(8).toString("hex"),
    media: sMedia,
    text: text,
    date
  }
}

route.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if("string" !== typeof id || id.length !== 16) {
    next();
    return;
  }
  const db = await getDB();
  const post = await db.post.findOne({ where: { id } });
  if(post) {
    res.json(post.toJSON());
    return;
  }
  next();
});


route.post("/", async (req, res) => {
  const { body } = req;
  const { userId } = req.cookies;
  try {
    const post = validatePost(body);
    const db = await getDB();
    const newPost = await db.post.create({ post, userId });
    res.json(newPost);
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
    const oldPost = await db.post.findOne({ where: { id }, json: true });
    if(!oldPost) {
      return next()
    }
    const updatedPost = validatePost(body);
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