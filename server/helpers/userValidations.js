const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");

const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum six in length"
);

const phoneError = new Error("Enter a 10 digit valid Phone number");

const registerSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string()
    .regex(CONSTANTS.APP_VALIDATIONS.strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
  firstname: Joi.string().min(4).max(255).required(),
  lastname: Joi.string().max(225),
  businessname: Joi.string().min(2).max(225).required(),
  phone: Joi.string()
    .min(10)
    .max(10)
    .regex(CONSTANTS.APP_VALIDATIONS.phoneRegex)
    .error(phoneError)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
