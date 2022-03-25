import cookie from "react-cookies";

export const getTokenCookie = () => cookie.load("w_auth");
export const removeTokenCookie = () => {
  cookie.remove("w_auth", { path: "/" });
};
export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
