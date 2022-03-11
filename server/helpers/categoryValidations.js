const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");

const registerSchema = Joi.object({
  name: Joi.string().min(4).max(255).required("Category name required"),
  time: Joi.string().min(4).max(225).required(),
  menuId: Joi.string()
    .guid(CONSTANTS.APP_VALIDATIONS.idValidation)
    .required("menuId required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
