const { FoodItem } = require("../models/foodItem");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const BulkCreateFoodItem = async (foodItemData) => {
  try {
    let foodItemsCreated = await FoodItem.create(foodItemData);
    return foodItemsCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchFoodItemsByCategoryId = async (categoryId) => {
  try {
    let findFoodItemsByCategoryId = await FoodItem.find({
      categoryId: categoryId,
    });
    return findFoodItemsByCategoryId;
  } catch (error) {
    throw error;
  }
};

module.exports = { BulkCreateFoodItem, fetchFoodItemsByCategoryId };
