import {
  CHANGE_TO_LARGE,
  CHANGE_TO_MEDIUM,
  CHANGE_TO_SMALL
} from "../actions/fontSizeReducer";
import { _DEFAULT_FONT_SIZE } from "../utils/config";

const initialState = {
  size: _DEFAULT_FONT_SIZE.medium
};
const fontSizeReducer = (state = initialState, { type, size }) => {
  switch (type) {
    case CHANGE_TO_SMALL:
      return {
        size
      };
    case CHANGE_TO_MEDIUM:
      return {
        size
      };
    case CHANGE_TO_LARGE:
      return {
        size
      };
    default:
      return state;
  }
};
export default fontSizeReducer;
