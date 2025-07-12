const { sendResponse } = require("../utils/common");
const { verifyToken } = require("../utils/genereteToken");
const User = require("../database/models/Users/users.model");

const authenticate = async (req, res, next) => {
  try {
    const headers = req.headers;
    const authorization = headers?.authorization;
    if (!authorization) {
      return sendResponse(res, 400, false, "No authorization header");
    }
    if (!authorization.startsWith("Bearer")) {
      return sendResponse(
        res,
        400,
        false,
        "Invalid authorization header value"
      );
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return sendResponse(res, 400, false, "No token found");
    }

    const result = verifyToken(token);

    if (!result) {
      return sendResponse(res, 400, false, "Invalid token");
    }
    const user = await User.findByPk(result.id);

    if (!user) {
      return sendResponse(res, 400, false, "User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in the middleware", error?.message);
    return sendResponse(res, 400, false, "Error while authentication.");
  }
};

const checkToken = async (req, res) => {
  try {
    const headers = req.headers;
    const authorization = headers?.authorization;
    if (!authorization) {
      return sendResponse(res, 400, false, "No authorization header");
    }
    if (!authorization.startsWith("Bearer")) {
      return sendResponse(
        res,
        400,
        false,
        "Invalid authorization header value"
      );
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return sendResponse(res, 400, false, "No token found");
    }

    const result = verifyToken(token);

    if (!result) {
      return sendResponse(res, 400, false, "Invalid token");
    }
    const user = await User.findByPk(result.id);

    if (!user) {
      return sendResponse(res, 400, false, "User not found.");
    }

    req.user = user;

    return sendResponse(res, 200, true, "Authentication Successful");
  } catch (error) {
    console.log("Error in the middleware", error?.message);
    return sendResponse(res, 400, false, "Error while authentication.");
  }
};
module.exports = {authenticate, checkToken};
