const express = require("express")

const router = express.Router();

//importing route modules
const streamRoutes = require("./stream/stream.route")
const userRoutes = require("./user/user.route")

//attaching route modules
router.use("/user", userRoutes)
router.use("/stream",streamRoutes)

module.exports = router;