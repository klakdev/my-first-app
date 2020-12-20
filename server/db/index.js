const user = require("./user");
const connect = require("./connection");


const connection = connect.getConnection();
module.exports = {
  user: user(connection),
}