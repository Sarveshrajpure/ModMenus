import { axiosInstance } from "../Utilities/axiosHelper";

export const getMenu = async (value) => {
  let menuData = await axiosInstance.get(`/menucard/getmenu/${value}`);
  return menuData;
};

export const guestRegister = async (values) => {
  let register = await axiosInstance.post("/guest/register", values);
  console.log(register);
  return register.data;
};

export const addToCart = async (id, cartItems) => {
  let values = {
    id,
    cartItems,
  };
  
  let cart = await axiosInstance.post("/guest/addToCart", values);
  return cart.data;
};

export const getCart = async (values) => {
  let cart = await axiosInstance.get(`/guest/fetchCart/${values.id}`);
  return cart.data;
};

export const order = async (values) => {
  let order = await axiosInstance.post("/orders/placeOrder", values);
  return order.data;
};
