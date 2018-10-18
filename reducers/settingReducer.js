import {
  MAKE_CONFIG,
  MAKE_CONFIG_ASYNC,
  MAKE_CONFIG_ASYNC_DONE,
  MAKE_CONFIG_ASYNC_REJECT,
  SET_DEFAULT,
  SYNC_CONFIG,
  FETCH_CONFIG,
  FETCH_CONFIG_DONE,
  FETCH_CONFIG_REJECT
} from "../actions/settingAction";
import { _DEFAULT_SETTING } from "../utils/config";

const initialState = {
  loading: false,
  error: "",
  params: {
    ..._DEFAULT_SETTING
  }
};
const settingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MAKE_CONFIG:
      return {
        ...state,
        params: {
          ...state.params,
          [payload.key]: payload.value
        }
      };
    case MAKE_CONFIG_ASYNC:
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          [payload.key]: payload.value
        }
      };
    case MAKE_CONFIG_ASYNC_DONE:
      return {
        ...state,
        loading: false
      };
    case MAKE_CONFIG_ASYNC_REJECT:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case SET_DEFAULT:
      return initialState;
    case SYNC_CONFIG:
      return {
        ...state,
        params: {
          ...payload
        }
      };
    case FETCH_CONFIG:
      return {
        ...state,
        loading: true
      };
    case FETCH_CONFIG_DONE:
      return {
        ...state,
        loading: false,
        params: {
          ...payload
        }
      };
    case FETCH_CONFIG_REJECT:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default settingReducer;
