const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");
Joi.objectId = require("joi-objectid")(Joi);

const categorySchema = Joi.object({
  name: Joi.string().min(4).max(255).required("Category name required"),
  time: Joi.string().min(4).max(225),
  menuId: Joi.objectId(),
});

module.exports = {
  categorySchema,
};
