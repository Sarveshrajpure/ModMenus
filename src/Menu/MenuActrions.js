import { axiosInstance } from "../Utilities/axiosHelper";

export const getMenu = async (value) => {
  let menuData = await axiosInstance.get(`/menucard/getmenu/${value}`);
  return menuData;
};

export const guestRegister = async (values) => {
  let register = await axiosInstance.post("/guest/register", values);
  return register;
};
