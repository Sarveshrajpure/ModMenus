const { FoodItem } = require("../models/foodItem");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const BulkCreateFoodItem = async (name, description, categoryId, images) => {
  try {
    let foodItemCreated = new FoodItem({ name, description, categoryId });

    await foodItemCreated.save();
    return foodItemCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { BulkCreateFoodItem };
