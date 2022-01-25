const { User } = require("../models/user");

const createUser = async (
  email,
  password,
  firstname,
  lastname,
  businessname
) => {
  try {
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

module.exports = {
  createUser,
};
