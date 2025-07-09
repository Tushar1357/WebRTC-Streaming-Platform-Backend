const User = require("../database/models/Users/users.model");

const usernameExists = async (username) => {
  try {
    const existingUser = await User.findOne({ where: { username } });
    return !!existingUser;
  } catch (error) {
    console.error("Error while checking username:", error.message);
    throw new Error("Database error while checking username");
  }
};

const emailExists = async (email) => {
  try {
    const existingEmail = await User.findOne({ where: { email } });
    return !!existingEmail;
  } catch (error) {
    console.error("Error while checking email:", error.message);
    throw new Error("Database error while checking email");
  }
};
module.exports = { usernameExists, emailExists };
