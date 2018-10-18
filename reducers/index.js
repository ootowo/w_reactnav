import { combineReducers } from "redux";

import modalReducer from "./modalReducer";
import settingReducer from "./settingReducer";
import sysvarReducer from "./sysvarReducer";
import userReducer from "./userReducer";
import bannerReducer from "./bannerReducer";
import fontSizeReducer from "./fontSizeReducer";

export default combineReducers({
  modalReducer,
  settingReducer,
  sysvarReducer,
  userReducer,
  bannerReducer,
  fontSizeReducer
});
