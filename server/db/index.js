const { init: initUser, User}  = require("./user");
const { init: initPost }  = require("./post");
const connect = require("./connection");

const db = {
  initialized: false,
};

async function init() {
  if(!db.initialized) {
    const connection = connect.getConnection();
    db.user = initUser(connection);
    db.post = await initPost(connection, User);
    
    db.initialized = true;
  }
  return db
}

module.exports = init;