import { FETCH_POPUP, FETCH_POPUP_DONE, FETCH_POPUP_REJECT } from "../actions/popupAction";

const initialState = {
  loading: false,
  error: "",
  data: {}
};

const popupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POPUP:
      return {
        ...state,
        loading: true
      };
    case FETCH_POPUP_DONE:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case FETCH_POPUP_REJECT:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default popupReducer;
