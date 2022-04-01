import cookie from "react-cookies";

export const getTokenCookie = () => cookie.load("x-access-token");
export const removeTokenCookie = () => {
  cookie.remove("x-access-token", { path: "/" });
};
export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
