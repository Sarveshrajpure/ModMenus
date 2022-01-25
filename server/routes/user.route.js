const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

///api/user/register

router.get("/register", userController.register);

module.exports = router;
