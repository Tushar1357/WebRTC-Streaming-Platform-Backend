const express = require("express")

const router = express.Router();

//importing route modules
const streamRoutes = require("./stream/stream.route")

//attaching route modules
router.use("/stream",streamRoutes)

module.exports = router;