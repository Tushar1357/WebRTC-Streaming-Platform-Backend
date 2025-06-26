const Stream = require("../../database/models/stream/stream.model");
const { sendResponse } = require("../../utils/common");
const { v4 } = require("uuid");

const createStream = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !userId) {
      return sendResponse(res, 400, false, "Please enter title and userId");
    }

    const streamKey = v4();

    if (!streamKey) {
      return sendResponse(res, 400, false, "Failed to create stream key.");
    }

    const result = await Stream.create({
      title,
      streamKey,
      description,
      userId,
      status: "offline"
    });

    if (!result) {
      return sendResponse(res, 400, false, "Failed to create stream key.");
    }

    return sendResponse(res, 200, true, "Created stream key.", {
      streamKey,
    });
  } catch (error) {
    console.log("Internal Server Error", error?.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

const editStream = async (req, res) => {
  try{
  }
  catch (error) {
    console.log("Internal Server Error", error?.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
}

module.exports = { createStream };
