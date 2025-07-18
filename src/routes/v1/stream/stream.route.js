const express = require("express");
const { sendResponse } = require("../../../utils/common");
const {
  createStream,
  getStreams,
  editStream,
  deleteStream,
  getStreamInfo,
} = require("../../../controllers/stream/stream.controller");
const {authenticate} = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", authenticate, createStream);
router.get("/get-streams", authenticate, getStreams);
router.post("/edit-stream", authenticate, editStream);
router.post("/delete-stream", authenticate, deleteStream);
router.post("/get-stream-info",authenticate,getStreamInfo)

module.exports = router;
