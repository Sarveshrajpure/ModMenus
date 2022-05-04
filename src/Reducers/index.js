import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import guestReducer from "./guestReducer";

import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whiteList: [""],
  blackList: ["Guest", "User"],
};

const rootReducer = combineReducers({
  User: userReducer,
  Guest: guestReducer,
});

export default persistReducer(persistConfig, rootReducer);
