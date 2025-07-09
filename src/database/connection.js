const sequelize = require("../config/db");
const Stream = require("./models/Stream/stream.model");
const User = require("./models/Users/users.model")

const connect = async () => {
  try {
    await sequelize.authenticate(); //authentication for connection to database
    console.log("Database connected");
    await sequelize.sync({ force: false }); //syncing database (use true to force create all the tables (not recommended))
    console.log("All models are synced");
  } catch (error) {
    console.error("Unable to connect to the database", error?.message);
  }
};

module.exports = connect;
