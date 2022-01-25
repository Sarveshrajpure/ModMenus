const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

///api/user/register

router.post("/register", userController.register);
///api/user/signin

router.post("/signin", userController.signin);
///api/user/isauth

router.get("/isauth", userController.isauth);

module.exports = router;
