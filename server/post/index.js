const crypto = require('crypto');
const express = require("express");
const validator = require("validator");
const AWS = require("aws-sdk");

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


function init(db) {

  const s3 = new AWS.S3();
  const route = express.Router();

  route.get("/", async (req, res) => {
    const { query: { offset }} = req;
    const nextPosts = await db.post.findNext({ limit: 7, offset });
    res.json(nextPosts);
  });

  route.get("/signedUrl", async (req, res) => {
    const { fileName } = req.query;
    const key = `${crypto.randomBytes(8).toString("hex")}-${fileName}`;
    const params = {
      Bucket: 'klakdev-my-first-app',
      Key: key,
      ACL: 'public-read',
    };
    try {
      const url = await s3.getSignedUrlPromise('putObject', params);
      res.json({ url });
    }
    catch(e) {
      res.status(503).end();
    }
  })
  
  
  
  
  route.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    if("string" !== typeof id || id.length !== 16) {
      next();
      return;
    }
    const post = await db.post.findById(id);
    if(post) {
      res.json(post.toJSON());
      return;
    }
    next();
  });
  
  
  route.post("/", async (req, res) => {
    const { body } = req;
    let { userId } = req.cookies;

    try {
      const post = validatePost({ ...body, userId });
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
      const oldPost = await db.post.findById(id);
      
      if(!oldPost) {
        return next()
      }
      
      if( userId !== oldPost.userId) {
        return res.status(403).status({
          error: "not permitted"
        })
      }
      
      const updatedPost = validatePost({ ...oldPost.toJSON(), ...body,  });
      const post = await db.post.update(updatedPost);
      res.json(post);
    } catch(e) {
      res.status(422).json({
        error: e.message,
      })
    }
  })
  
  route.delete("/:id", async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const count = await db.post.delete(id);
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
  return route;
}


const ROUTE_PATH = "/post"

module.exports = {
  init,
  ROUTE_PATH
}


