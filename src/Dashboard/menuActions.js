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

export const UpdateCategory = async (values) => {
  const updateCategory = await axiosInstance.patch(
    "/menucard/updatecategory",
    values,
    getAuthHeader()
  );
  return updateCategory;
};

export const DeleteCategory = async (values) => {
  console.log(getAuthHeader);
  const deleteCategory = await axiosInstance.post(
    "/menucard/deletecategory",
    values,
    getAuthHeader()
  );
  return deleteCategory;
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

export const UpdateFoodItem = async (values) => {
  const updateFoodItem = await axiosInstance.post(
    "/menucard/updatefooditem",
    values,
    getAuthHeader()
  );
  return updateFoodItem;
};

export const DeleteFoodItem = async (values) => {
  const deleteFoodItem = await axiosInstance.post(
    "/menucard/deletefooditem",
    values,
    getAuthHeader()
  );
  return deleteFoodItem;
};

export const getMenu = async (value) => {
  let menuData = await axiosInstance.get(`/menucard/getmenu/${value}`);
  return menuData;
};

//-----------------------------orders actions--------------------------------------------------------

export const fetchOrdersByBusinessId = async (values) => {
  const orders = await axiosInstance.get(
    `/orders/findorderbybusinessid/${values.businessId}`
  );
  return orders;
};

export const updateOrderStatus = async (values) => {
  const updateOrder = await axiosInstance.post(
    "/orders/updateorderstatus",
    values,
    getAuthHeader()
  );
  return updateOrder;
};
