const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (payload, expiresIn = '30d') => {
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn});
  return token;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error("Invalid or expired token:", err.message);
    return null;
  }
};

module.exports = { createToken, verifyToken };
