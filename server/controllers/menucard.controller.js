const {
  categoryService,
  foodItemService,
  menuService,
} = require("../services");
const { categorySchema } = require("../helpers/categoryValidations.js");
const { foodItemSchema } = require("../helpers/foodItemValidations.js");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const menucardController = {
  //CREATE apis
  async createCategories(req, res, next) {
    try {
      let businessId = req.user.id;

      let value = await categorySchema.validateAsync(req.body);

      let categoryCreated = await categoryService.createCategory(
        value.name,
        value.time,
        value.menuId
      );
      res.status(httpStatus.CREATED).send(categoryCreated);
    } catch (error) {
      next(error);
    }
  },
  async createFoodItems(req, res, next) {
    try {
      let value = await foodItemSchema.validateAsync(req.body);

      let foodItemCreated = await foodItemService.BulkCreateFoodItem(value);
      console.log(foodItemCreated);

      res.status(httpStatus.CREATED).send(foodItemCreated);
    } catch (error) {
      next(error);
    }
  },

  //FETCH apis
  async getmenucard(req, res, next) {
    try {
      let menuCardData = [{ menuData: "", categoryAndFoodItemData: "" }];

      //Finding menu by menyu reference
      let menuDetails = await menuService.findMenuByReference(
        req.params.menuReference
      );

      let menuId = menuDetails.id;
      menuCardData[0].menuData = menuDetails;

      //Finding categories by menuId
      let categoriesData = await categoryService.fetchCategoriesByMenuID(
        menuId
      );
      let fAndcInfo = [];
      for (let i = 0; i < categoriesData.length; i++) {
        let categoryId = categoriesData[i].id;
        //Finding food items by categoryId
        let foodItemData = await foodItemService.fetchFoodItemsByCategoryId(
          categoryId
        );

        fAndcInfo.push({
          categoriesData: categoriesData[i],
          foodItemData: foodItemData,
        });
      }
      menuCardData[0].categoryAndFoodItemData = fAndcInfo;

      res.status(httpStatus.OK).send(menuCardData);
    } catch (error) {
      next(error);
    }
  },
  
};

module.exports = menucardController;
