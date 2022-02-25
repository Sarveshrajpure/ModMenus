const { User } = require("../models/user");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { userService } = require("../services");

const userController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);

      if (!user) {
        new ApiError(httpStatus.NOT_FOUND, "User not Found");
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
