const { userService } = require("../services");

const userController = {
  async register() {
    try {
      const response = await userService.register();

      console.log(response);
    } catch (error) {}
  },
};

module.exports = userController;
