const express = require("express");
const { createUser, checkUser } = require("../../../controllers/user/user.controller");

const router = express.Router();

router.post("/register",createUser)
router.post("/login",checkUser)

module.exports = router;