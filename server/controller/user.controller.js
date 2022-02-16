const { userService } = require("../services");
const { registerSchema, loginSchema } = require("../helpers/userValidations");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const { User } = require("../models/user");

const userController = {
  async register(req, res, next) {
    try {
      //validate user register data using joi schema
      let value = await registerSchema.validateAsync(req.body);

      if (value) {
        //check if email is unique in mongo
        if (await User.emailTaken(value.email)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Sorry email already taken"
          );
        }

        //check if business name is unique in mongo
        if (await User.businessnameTaken(value.businessname)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Sorry Business Name already taken"
          );
        }

        //create new user in mongo
        let user = await userService.createUser(
          value.email,
          value.password,
          value.firstname,
          value.lastname,
          value.businessname
        );

        //set access token
        let token = await userService.genAuthToken(user);

        ///send register email

        //set access token to cookies
        res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
          user,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async signin(req, res, next) {
    try {
      //validate user login data using joi schema
      let value = await loginSchema.validateAsync(req.body);
      if (value) {
        const user = await userService.signInWithEmailAndPassword(
          value.email,
          value.password
        );
        //set access token
        let token = await userService.genAuthToken(user);

        //set access token to cookies
        res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
          user,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async isauth(req, res, next) {
    try {
    } catch (error) {}
  },
};

module.exports = userController;
