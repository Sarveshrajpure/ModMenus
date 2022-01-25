const httpStatus = require("http-status");
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
      const token = await userService.genAuthToken(user);

      ///send register email

      res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      next(error);
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
