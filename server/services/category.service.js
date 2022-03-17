const { Category } = require("../models/category");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const createCategory = async (name, time, menuId) => {
  try {
    const categoryCreated = new Category({ name, time, menuId });

    await categoryCreated.save();

    return categoryCreated;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (name, time, id) => {
  try {
    let updateCategory = await Category.findByIdAndUpdate(id, {
      $set: { name: name, time: time },
    });
    return updateCategory;
  } catch (error) {
    throw error;
  }
};

const fetchCategoriesByMenuID = async (menuId) => {
  try {
    let findCategoriesByMenuId = await Category.find({ menuId: menuId });
    return findCategoriesByMenuId;
  } catch (error) {
    throw error;
  }
};

module.exports = { createCategory, fetchCategoriesByMenuID, updateCategory };
