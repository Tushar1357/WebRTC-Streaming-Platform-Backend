const { sendResponse, hashPassword, verifyPassword } = require("../../utils/common");
const { create_user_schema, verify_user_schema } = require("../../validators/user.validator");
const User = require("../../database/models/Users/users.model");
const { usernameExists, emailExists } = require("../../services/user.service");
const { createToken } = require("../../utils/genereteToken");
require('dotenv').config();


const createUser = async (req, res) => {
  try {
    const { error, value } = create_user_schema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, false, `Validation Error: ${error.details[0].message}`);
    }
    const { first_name, last_name, username, email, password } = value;
    const [usernameTaken, emailTaken] = await Promise.all([
      usernameExists(username),
      emailExists(email),
    ]);

    if (usernameTaken || emailTaken) {
      const reason =
        usernameTaken && emailTaken
          ? "Username and email already exist."
          : usernameTaken
          ? "Username already exists."
          : "Email already exists.";
      return sendResponse(res, 400, false, reason);
    }
    const hashedPassword = await hashPassword(password);
    const result = await User.create({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
    });

    if (result) {
      return sendResponse(
        res,
        200,
        true,
        "User successfully created. Please go to login page and login."
      );
    }
  } catch (error) {
    console.log("Internal Server Error", error?.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

const checkUser = async (req, res) => {
  try {
    const { error, value } = verify_user_schema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, false, `Validation Error: ${error.details[0].message}`);

    }

    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      await verifyPassword(password, '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
      return sendResponse(res, 400, false, "Invalid credentials.");
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, false, "Invalid credentials.");
    }

    const token = createToken({id: user.id});

    return sendResponse(res, 200, true, "User authenticated.",{token, name: `${user.first_name} ${user?.last_name}`,userId: user.id});
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};


const updateUser = async(req, res) => {
  try{
    
  }
  catch(error){
    console.error("Internal Server Error:", error.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
}

module.exports = { createUser, checkUser };
