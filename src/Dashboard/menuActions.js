import axios from "axios";
import { axiosInstance } from "../Utilities/axiosHelper";

import { getAuthHeader } from "../Utilities/authTools.js";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const CreateCategory = async (values) => {
  let data = {
    name: values.name,
    time: values.time,
    menuId: values.menuId,
  };

  const newCategory = await axiosInstance.post(
    "/menucard/createcategory",
    data,
    getAuthHeader()
  );

  return newCategory.data;
};

export const FetchCategory = async (values) => {
  const Categories = await axiosInstance.get(
    `/menucard/getcategories/${values.menuId}`,
    getAuthHeader()
  );
  return Categories.data;
};

export const CreateFoodItem = async (values) => {
  let data = {
    name: values.name,
    description: values.description,
    categoryId: values.categoryId,
    price: values.price,
  };
  console.log("in create food action");

  const newFoodItem = await axiosInstance.post(
    "/menucard/createfoodItem",
    data,
    getAuthHeader()
  );

  return newFoodItem.data;
};

export const FetchFoodItem = async (values) => {
  const foodItem = await axiosInstance.get(
    `/menucard/getfoodItem/${values.categoryId}`,
    getAuthHeader()
  );
  return foodItem.data;
};
