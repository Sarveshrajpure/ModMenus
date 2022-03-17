const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");
Joi.objectId = require("joi-objectid")(Joi);

const itemDetails = Joi.object().keys({
  name: Joi.string().min(3).max(225).required(),
  description: Joi.string().min(3).max(225),
  categoryId: Joi.objectId(),
  images: Joi.array(),
});

const foodItemSchema = Joi.array().items(itemDetails);

module.exports = {
  foodItemSchema,
};
