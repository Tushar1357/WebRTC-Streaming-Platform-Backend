const { sendResponse } = require("../utils/common");


//method to check errors in between request and response
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode;
  const message = err.message;

  return sendResponse(res, statusCode, false, message);
};

module.exports = errorHandler;
