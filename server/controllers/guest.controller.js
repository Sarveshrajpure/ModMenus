const { guestService } = require("../services");
const {
  registerSchema,
  fetchGuestSchema,
} = require("../helpers/guestValidations");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { Guest } = require("../models/guest");

const guestController = {
  async register(req, res, next) {
    try {
      //validate guest register data using joi schema
      let value = await registerSchema.validateAsync(req.body);

      console.log(value.businessId);

      if (value) {
        //check if phone is unique in mongo
        if (await Guest.phoneTaken(value.email)) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Phone already exists");
        }
        //check if email is unique in mongo
        if (await Guest.emailTaken(value.email)) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
        }

        //create new Guest in mongo
        let guest = await guestService.createGuest(
          value.email,
          value.name,
          value.phone,
          value.businessId
        );

        res.status(httpStatus.CREATED).send({
          guest,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async fetchGuests(req, res, next) {
    try {
      //validate guest fetch data-"businessId" using joi schema
      let value = await fetchGuestSchema.validateAsync(req.body);

      if (value) {
        let guestList = await guestService.getGuests(value.businessId);

        res.status(httpStatus.FOUND).send({
          guestList,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = guestController;