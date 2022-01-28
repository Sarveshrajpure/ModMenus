const { userService } = require("../services");
const Joi = require("@hapi/joi");
const { registerSchema } = require("../helpers/userValidations");

const userController = {
  async register(req, res, next) {
    try {
      let value = await registerSchema.validateAsync(req.body);

      let { email, password, firstname, lastname, businessname } = req.body;

      let user = await userService.createUser(
        email,
        password,
        firstname,
        lastname,
        businessname
      );
      let token = await userService.genAuthToken(user);

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
