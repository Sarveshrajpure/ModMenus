import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";

import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["User"],
  blackList: [""],
};
const rootReducer = combineReducers({
  User: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
