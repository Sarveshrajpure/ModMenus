const { userService } = require("../services");

const userController = {
  async register(req, res, next) {
    try {
      const { email, password, firstname, lastname, businessname } = req.body;

      const user = await userService.createUser(
        email,
        password,
        firstname,
        lastname,
        businessname
      );

      res.status(200).send({
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async signin(req, res, next) {
    try {
    } catch (error) {}
  },
  async isauth(req, res, next) {
    try {
    } catch (error) {}
  },
};

module.exports = userController;
