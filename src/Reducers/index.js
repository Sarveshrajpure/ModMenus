import userReducer from "./userReducer";

import { combineReducers } from "redux";

// const persistConfig = {
//   key: "root",
//   storage,
//   whiteList: [""],
//   blackList: [""],
// };
const rootReducer = combineReducers({
  User: userReducer,
});

export default rootReducer;
