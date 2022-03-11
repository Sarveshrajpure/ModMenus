const mongoose = require("mongoose");
require("dotenv").config();

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },

  businessId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menuReference: {
    type: String,
    required: true,
    maxLength: 100,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu };
