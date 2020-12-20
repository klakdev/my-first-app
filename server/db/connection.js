const { Sequelize } = require("sequelize");

const database = "app";
const username = "app_user";
const password = process.env.PGPASSWORD;
const dialect = "postgres";
const schema = "first_application";

exports.getConnection = () => {
  return new Sequelize({
    database,
    username,
    password,
    schema,
    dialect,
  });
}


