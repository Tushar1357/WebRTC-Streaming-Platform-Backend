const { Sequelize } = require("sequelize");
require("dotenv").config();

const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;


//sequelize object to make connection to the database

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
}); 


module.exports = sequelize;
