const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string().min(4).max(225).required(),
  firstname: Joi.string().min(4).max(255).required(),
  lastname: Joi.string().max(225),
  businessname: Joi.string().min(2).max(225).required(),
});

module.exports = {
  registerSchema,
};
