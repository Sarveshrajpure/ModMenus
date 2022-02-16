const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  businessname: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  }
  next();
});

userSchema.methods.generateAuthToken = function () {
  let user = this;

  const userObj = { sub: user._id.toHexString() };

  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" });

  return token;
};

userSchema.statics.emailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.statics.businessnameTaken = async function (businessname) {
  const user = await this.findOne({ businessname });
  return !!user;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
