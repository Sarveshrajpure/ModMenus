const mongoose = require("mongoose");

require("dotenv").config();

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  time: {
    type: String,
    required: false,
    maxLength: 100,
  },

  menuId: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
