const Joi = require("@hapi/joi");

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum six in length"
);

const registerSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string()
    .regex(strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
  firstname: Joi.string().min(4).max(255).required(),
  lastname: Joi.string().max(225),
  businessname: Joi.string().min(2).max(225).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
