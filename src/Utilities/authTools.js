import cookie from "react-cookies";

export const getTokenCookie = () => cookie.load("modm-x-access-token");
export const removeTokenCookie = async () => {
  let response = await cookie.remove("modm-x-access-token", { path: "/" });
  return response;
};
export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
