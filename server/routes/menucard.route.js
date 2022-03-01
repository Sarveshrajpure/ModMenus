const express = require("express");
const menucardController = require("../controllers/menucard.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/menucard/createmenu
router.post("/createmenu", menucardController.createmenucard);

///api/menucard/getmenu/:menuReference
router.get("/getmenu/:menuReference", menucardController.getmenucard);

module.exports = router;
