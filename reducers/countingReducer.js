import {
  SET_COUNTING_INTERNAL,
  SET_COUNTING_EXTERNAL,
  SET_COUNTING_COUPON,
  SET_COUNTING_MAIL,
  SET_COUNTING_CATALOG,
  SET_COUNTING_OFFER,
  SET_COUNTING_REWARD
} from "../actions/countingAction";

const initialState = {
  loading: false,
  error: "",
  internal: {
    coupon: 0,
    mail: 0,
    catalog: 0,
    offer: 0,
    reward: 0
  },
  external: {
    coupon: 0,
    mail: 0,
    catalog: 0,
    offer: 0,
    reward: 0
  }
};
const countingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTING_INTERNAL:
      return {
        ...state,
        internal: payload
      };
    case SET_COUNTING_EXTERNAL:
      return {
        ...state,
        external: payload
      };
    case SET_COUNTING_COUPON:
      return {
        ...state,
        internal: {
          ...state.internal,
          coupon: payload
        },
        external: {
          ...state.external,
          coupon: payload
        }
      };
    case SET_COUNTING_MAIL:
      return {
        ...state,
        internal: {
          ...state.internal,
          mail: payload
        },
        external: {
          ...state.external,
          mail: payload
        }
      };
    case SET_COUNTING_CATALOG:
      return {
        ...state,
        internal: {
          ...state.internal,
          catalog: payload
        },
        external: {
          ...state.external,
          catalog: payload
        }
      };
    case SET_COUNTING_OFFER:
      return {
        ...state,
        internal: {
          ...state.internal,
          offer: payload
        },
        external: {
          ...state.external,
          offer: payload
        }
      };
    case SET_COUNTING_REWARD:
      return {
        ...state,
        internal: {
          ...state.internal,
          reward: payload
        },
        external: {
          ...state.external,
          reward: payload
        }
      };
    default:
      return state;
  }
};

export default countingReducer;
