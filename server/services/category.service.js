const { Category } = require("../models/category");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const createCategory = async (name, time, menuId) => {
  try {
    let categoryCreated = new Category({ name, time, menuId });

    await categoryCreated.save();
    return categoryCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { createCategory };
