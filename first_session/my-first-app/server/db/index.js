
const { User, init: initUser } = require("./user");
const { Post, init: initPost } = require("./post");
const { getConnection } = require("./connection");

/**
 * @typedef DB
 * @property {User} user
 * @property {Post} post
 * @property {boolean} initialized
 */

const db = {
  initialized: false,
  user: null,
  post: null,
}

async function getDB() {
  if(!db.initialized) {
    const connection = getConnection();
    db.user = initUser(connection);
    db.post = await initPost(connection, User);
    
    db.initialized = true;
  }
  return db
}

module.exports = getDB;