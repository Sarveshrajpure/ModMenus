const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/user/register
router.post("/register", userController.register);

///api/user/signin
router.post("/signin", userController.signin);

///api/user/isauth
router.get("/isauth", auth(), userController.isauth);

module.exports = router;
