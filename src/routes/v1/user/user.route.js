const express = require("express");
const { createUser, checkUser } = require("../../../controllers/user/user.controller");
const { checkToken } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.post("/sign-up",createUser)
router.post("/login",checkUser)
router.get("/check-token", checkToken)

module.exports = router;