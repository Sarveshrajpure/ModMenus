const mongoose = require("mongoose");
require("dotenv").config();

const foodItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    maxLength: 250,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = { FoodItem };
