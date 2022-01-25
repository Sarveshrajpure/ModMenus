const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  lastname: { type: String, required: true, maxLength: 100, trim: true },

  businessname: { type: String, required: true, maxLength: 100, trim: true },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
