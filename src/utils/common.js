const bcrypt = require("bcrypt");

const sendResponse = (res, statusCode, status, message, data) => {
  try {
    const msg = {
      statusCode,
      status,
      message,
    };

    if (data) {
      msg["data"] = data;
    }

    res.json(msg);
  } catch (error) {
    console.error("Error while sending resposne. Error:", error?.message);
  }
};

const hashPassword = async (password) => {
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
  } catch (error) {
    console.log("Error while hashing password", error?.message);
    throw new Error("Error while hashing password")

  }
};

const verifyPassword = async (ogpassword, hashpassword) => {
  try {
    const result = await bcrypt.compare(ogpassword, hashpassword);
    return result;
  } catch (error) {
    console.log("Error while verifying password", error?.message);
    throw new Error("Error while verifying password")
  }
};

module.exports = { sendResponse, hashPassword, verifyPassword };
