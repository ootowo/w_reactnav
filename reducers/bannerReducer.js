import { FETCH_BANNER, FETCH_BANNER_DONE, FETCH_BANNER_REJECT } from "../actions/bannerAction";

const initialState = {
  loading: false,
  error: "",
  home: [],
  coupon: [],
  mail: [],
  catalog: []
};
const bannerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BANNER:
      return {
        ...state,
        loading: true
      };
    case FETCH_BANNER_DONE:
      return {
        ...state,
        loading: false,
        home: payload.home,
        coupon: payload.coupon,
        mail: payload.mail,
        catalog: payload.catalog
      };
    case FETCH_BANNER_REJECT:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default bannerReducer;
