import axios from "axios";
import { axiosInstance } from "../Utilities/axiosHelper";

import {
  getTokenCookie,
  getAuthHeader,
  removeTokenCookie,
} from "../Utilities/authTools.js";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const LoginUser = async (values) => {
  const loginInfo = await axiosInstance.post("/auth/signin", {
    email: values.email,
    password: values.password,
  });

  return loginInfo.data;
};

export const userIsAuth = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie()) {
        throw new Error("Unauthorized");
      }
      const user = await axiosInstance.get("/api/auth/isauth", getAuthHeader());

      return user;
    } catch (error) {}
  };
};

export const userSignOut = () => {
  console.log("in delete cookie");
  return async (dispatch) => {
    removeTokenCookie();
  };
};
