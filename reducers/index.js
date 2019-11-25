import { combineReducers } from "redux";

import bannerReducer from "./bannerReducer";
import fontSizeReducer from "./fontSizeReducer";
import modalReducer from "./modalReducer";
import settingReducer from "./settingReducer";
import sysvarReducer from "./sysvarReducer";
import userReducer from "./userReducer";
import countingReducer from "./countingReducer";
import popupReducer from "./popupReducer";

export default combineReducers({
  modalReducer,
  settingReducer,
  sysvarReducer,
  userReducer,
  bannerReducer,
  fontSizeReducer,
  countingReducer,
  popupReducer
});
