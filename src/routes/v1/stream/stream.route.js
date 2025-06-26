const express = require("express");
const { sendResponse } = require("../../../utils/common");

const router = express.Router();

router.get("/create", (req, res) => {
  return sendResponse(res, 200, true, "Stream created...");
});

module.exports = router;
