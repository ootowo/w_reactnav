import {
  SET_VAR,
  SET_VAR_DONE,
  SET_VAR_REJECT,
  GET_VAR,
  GET_VAR_DONE,
  GET_VAR_REJECT
} from "../actions/sysvarAction";
import { _DEFAULT_SYS_VAR } from "../utils/config";

const initialState = {
  loading: false,
  error: "",
  params: _DEFAULT_SYS_VAR
};
const sysvarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VAR:
      return {
        ...state,
        loading: true
      };
    case GET_VAR_DONE:
      return {
        ...state,
        loading: false,
        params: payload
      };
    case GET_VAR_REJECT:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case SET_VAR:
      return {
        ...state,
        loading: true,
        params: payload
      };
    case SET_VAR_DONE:
      return {
        ...state,
        loading: false
      };
    case SET_VAR_REJECT:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default sysvarReducer;
