import {
  AUTHEN_LOGIN,
  AUTHEN_LOGIN_DONE,
  AUTHEN_LOGIN_REJECT,
  AUTHEN_FACEBOOK_LOGIN,
  // AUTHEN_LOGOUT,
  // AUTHEN_LOGOUT_DONE,
  // AUTHEN_LOGOUT_REJECT,
  SYNC_AUTHEN,
  SYNC_AUTHEN_DONE,
  SYNC_AUTHEN_REJECT,
  AUTHEN_CLEAR
} from "../actions/userAction";

const initialState = {
  loading: false,
  error: "",
  user: {}
};
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHEN_LOGIN:
      return {
        ...state,
        loading: true
      };
    case AUTHEN_LOGIN_DONE:
      return {
        ...state,
        loading: false,
        user: payload
      };
    case AUTHEN_LOGIN_REJECT:
      return {
        loading: false,
        error: payload,
        user: {}
      };
    case AUTHEN_FACEBOOK_LOGIN:
      return {
        ...state,
        loading: true
      };
    // case AUTHEN_LOGOUT:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case AUTHEN_LOGOUT_DONE:
    //   return {
    //     ...state,
    //     loading: false,
    //     user: {}
    //   };
    // case AUTHEN_LOGOUT_REJECT:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: payload
    //   };
    case AUTHEN_CLEAR:
      return initialState;
    case SYNC_AUTHEN:
      return {
        ...state,
        loading: true
      };
    case SYNC_AUTHEN_DONE:
      return {
        ...state,
        loading: false,
        user: payload
      };
    case SYNC_AUTHEN_REJECT:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default userReducer;
