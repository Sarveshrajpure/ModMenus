const express = require("express");
const menucardController = require("../controllers/menucard.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/menucard/createCategories
router.post("/createcategory", auth(), menucardController.createCategories);

///api/menucard/createFoodItems
router.post("/createfoodItem", auth(), menucardController.createFoodItems);

///api/menucard/getmenu/:menuReference
router.get("/getmenu/:menuReference", menucardController.getmenucard);

module.exports = router;
