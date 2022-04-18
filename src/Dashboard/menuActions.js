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

export const FetchCategoryById = async (value) => {
  const Category = await axiosInstance.get(
    `/menucard/getcategorybyid/${value}`
  );
  return Category.data;
};

export const CreateFoodItem = async (values) => {
  console.log(values);

  const newFoodItem = await axiosInstance.post(
    "/menucard/createfoodItem",
    values,
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
export const getMenu = async (value) => {
  let menuData = await axiosInstance.get(`/menucard/getmenu/${value}`);
  return menuData;
};
