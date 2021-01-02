const { Sequelize } = require("sequelize");

const host = "database-1.cnjllearqjtz.us-east-1.rds.amazonaws.com"; //localhost
const database = "first_app";
const username = "postgres";
const password = process.env.PGPASSWORD;
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
