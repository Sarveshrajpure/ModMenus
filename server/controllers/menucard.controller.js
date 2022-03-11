const { menuService, categoryService } = require("../services");
const { registerSchema, loginSchema } = require("../helpers/userValidations");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { User } = require("../models/user");

const menucardController = {
  async createCategories(req, res, next) {
    try {
      let businessId = req.user.id;
      console.log(businessId);
    } catch (error) {
      next(error);
    }
  },
  async createFoodItems(req, res, next) {
    let businessId = req.user.id;
    console.log(businessId);
  },
  async getmenucard(req, res, next) {},
};

module.exports = menucardController;
