const express = require("express");
const { sendResponse } = require("../../../utils/common");
const { createStream } = require("../../../controllers/stream/stream.controller");

const router = express.Router();

router.post("/create", createStream);

module.exports = router;
