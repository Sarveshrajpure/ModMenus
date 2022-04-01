import {
  REGISTER_USER,
  LOGIN_USER,
  VERIFY_USER,
  SIGNOUT_USER,
} from "../Actions/types";
let userDefault = {
  data: {
    firstName: "",
    lastName: "",
    email: "",
    buinessname: "",
    phone: "",
  },
  auth: null,
};
const userReducer = (state = { loginInfo: userDefault }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginInfo: { ...action.payload },
        auth: false,
      };
    case VERIFY_USER:
      return {
        ...state,
        loginInfo: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };
    case REGISTER_USER:
      return {
        ...state,
        user_verification: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        user_verification: { ...userDefault.data },
        auth: false,
      };

    default:
      return state;
  }
};

export default userReducer;
