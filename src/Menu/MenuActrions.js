import { axiosInstance } from "../Utilities/axiosHelper";

export const getMenu = async (value) => {
  let menuData = await axiosInstance.get(`/menucard/getmenu/${value}`);
  return menuData;
};
