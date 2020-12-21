const { Sequelize } = require("sequelize");

const host = "database-1.cnjllearqjtz.us-east-1.rds.amazonaws.com";
const database = "first_app";
const username = "postgres";
const password = "1234567890";
const dialect = "postgres";
const schema = "application";

exports.getConnection = () => {
  return new Sequelize({
    host,
    database,
    username,
    password,
    schema,
    dialect,
  });
}
