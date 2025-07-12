const Stream = require("../../database/models/Stream/stream.model");
const { sendResponse } = require("../../utils/common");
const { v4 } = require("uuid");

//method to create stream
const createStream = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id: userId } = req.user;
    if (!title || !userId) {
      return sendResponse(res, 400, false, "Missing fields for stream update.");
    }

    const streamKey = v4();

    const result = await Stream.create({
      title,
      streamKey,
      description,
      userId,
      status: "offline",
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

//method to edit stream
const editStream = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { streamKey, title, description } = req.body;

    if (!streamKey || (!title && !description)) {
      return sendResponse(res, 400, false, "Missing fields for stream update.");
    }

    const stream = await Stream.findOne({ where: { streamKey, userId } });
    if (!stream) {
      return sendResponse(res, 404, false, "Stream not found.");
    }

    if (title) stream.title = title;
    if (description) stream.description = description;
    await stream.save();

    return sendResponse(res, 200, true, "Stream updated successfully.");
  } catch (error) {
    console.log("Internal Server Error", error?.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

const getStreams = async (req, res) => {
  try {
    const { id: userId } = req.user;
    if (!userId) {
      return sendResponse(res, 400, false, "Please enter userId");
    }
    const data = await Stream.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    if (data.length === 0) {
      return sendResponse(res, 200, true, "No stream key found.");
    }

    const streamDetails = data.map((item) => {
      return {
        title: item.title,
        description: item.description,
        streamKey: item.streamKey,
      };
    });

    return sendResponse(res, 200, true, "Found stream keys.", {
      streamDetails,
    });
  } catch (error) {
    console.log("Internal Server Error", error?.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

const deleteStream = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { streamKey } = req.body;

    if (!streamKey) {
      return sendResponse(res, 400, false, "Please provide streamKey.");
    }

    const result = await Stream.destroy({ where: { streamKey, userId } });
    if (result === 0) {
      return sendResponse(
        res,
        400,
        false,
        "Stream not found or already deleted."
      );
    }

    return sendResponse(res, 200, true, "Stream deleted successfully.");
  } catch (error) {
    console.log("Internal Server Error", error?.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

const getStreamInfo = async (req, res) => {
  try {
    const { streamKey } = req.body;
    if (!streamKey) {
      return sendResponse(res, 400, false, "Please enter details.");
    }

    const streamInfo = await Stream.findOne({ where: { streamKey } });

    if (!streamInfo) {
      return sendResponse(res, 400, false, "Invalid stream key");
    }

    const streamDetails = {
      title: streamInfo.title,
      description: streamInfo.description,
      userId: streamInfo.userId,
    };

    return sendResponse(res, 200, true, "Stream details", { streamDetails });
  } catch (error) {
    console.log("Internal Server Error", error?.message);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

module.exports = { createStream, getStreams, editStream, deleteStream,getStreamInfo };
