const { User } = require("../models/user");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");

const createUser = async (
  email,
  password,
  firstname,
  lastname,
  businessname
) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email already taken");
    }

    const user = new User({
      email,
      password,
      firstname,
      lastname,
      businessname,
    });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
  try {
    const token = user.generateAuthToken();
    return token;
  } catch (error) {}
};

module.exports = {
  createUser,
  genAuthToken,
};
