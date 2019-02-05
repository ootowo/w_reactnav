import {
  OPEN_SOCIAL_MODAL,
  CLOSE_SOCIAL_MODAL,
  TOGGLE_SOCIAL_MODAL,
  OPEN_COUPON_MODAL,
  CLOSE_COUPON_MODAL,
  TOGGLE_COUPON_MODAL,
  OPEN_ANNOUCE_MODAL,
  CLOSE_ANNOUCE_MODAL,
  TOGGLE_ANNOUCE_MODAL,
  OPEN_REWARD_MODAL,
  CLOSE_REWARD_MODAL,
  TOGGLE_REWARD_MODAL,
  OPEN_CARD_PREVIEW_MODAL,
  CLOSE_CARD_PREVIEW_MODAL,
  TOGGLE_CARD_PREVIEW_MODAL,
  OPEN_SELECT_BRANCH_MODAL,
  CLOSE_SELECT_BRANCH_MODAL,
  TOGGLE_SELECT_BRANCH_MODAL,
  OPEN_COUPON_REDEEM_MODAL,
  CLOSE_COUPON_REDEEM_MODAL,
  TOGGLE_COUPON_REDEEM_MODAL,
  OPEN_REWARD_EARNED_MODAL,
  CLOSE_REWARD_EARNED_MODAL,
  TOGGLE_REWARD_EARNED_MODAL,
  OPEN_AUTHEN_MODAL,
  CLOSE_AUTHEN_MODAL,
  TOGGLE_AUTHEN_MODAL,
  OPEN_SHIPPING_CHECK_MODAL,
  CLOSE_SHIPPING_CHECK_MODAL,
  TOGGLE_SHIPPING_CHECK_MODAL
} from "../actions/modalAction";

const modalReducer = (
  state = {
    social: false,
    coupon: {
      visible: false,
      data: {}
    },
    coupon_redeem: {
      visible: false,
      data: {}
    },
    reward: {
      visible: false,
      data: {}
    },
    reward_earned: {
      visible: false,
      data: {}
    },
    annouce: {
      visible: false,
      data: {}
    },
    card: {
      visible: false,
      data: {}
    },
    selectBranch: false,
    shipping_check: false
  },
  { type, payload }
) => {
  switch (type) {
    case OPEN_SOCIAL_MODAL:
      return {
        ...state,
        social: true
      };
    case CLOSE_SOCIAL_MODAL:
      return {
        ...state,
        social: false
      };
    case TOGGLE_SOCIAL_MODAL:
      return {
        ...state,
        social: !state.social
      };
    case OPEN_COUPON_MODAL:
      return {
        ...state,
        coupon: {
          visible: true,
          data: payload
        }
      };
    case CLOSE_COUPON_MODAL:
      return {
        ...state,
        coupon: {
          visible: false,
          data: {}
        }
      };
    case TOGGLE_COUPON_MODAL:
      return {
        ...state,
        coupon: {
          visible: !state.coupon.visible,
          data: payload
        }
      };
    case OPEN_COUPON_REDEEM_MODAL:
      return {
        ...state,
        coupon_redeem: {
          visible: true,
          data: payload
        }
      };
    case CLOSE_COUPON_REDEEM_MODAL:
      return {
        ...state,
        coupon_redeem: {
          visible: false,
          data: {}
        }
      };
    case TOGGLE_COUPON_REDEEM_MODAL:
      return {
        ...state,
        coupon_redeem: {
          visible: !state.coupon_redeem.visible,
          data: payload
        }
      };
    case OPEN_REWARD_MODAL:
      return {
        ...state,
        reward: {
          visible: true,
          data: payload
        }
      };
    case CLOSE_REWARD_MODAL:
      return {
        ...state,
        reward: {
          visible: false,
          data: {}
        }
      };
    case TOGGLE_REWARD_MODAL:
      return {
        ...state,
        reward: {
          visible: !state.reward.visible,
          data: payload
        }
      };
    case OPEN_REWARD_EARNED_MODAL:
      return {
        ...state,
        reward_earned: {
          visible: true,
          data: payload
        }
      };
    case CLOSE_REWARD_EARNED_MODAL:
      return {
        ...state,
        reward_earned: {
          visible: false,
          data: {}
        }
      };
    case TOGGLE_REWARD_EARNED_MODAL:
      return {
        ...state,
        reward_earned: {
          visible: !state.reward_earned.visible,
          data: payload
        }
      };
    case OPEN_ANNOUCE_MODAL:
      return {
        ...state,
        annouce: {
          visible: true,
          data: payload
        }
      };
    case CLOSE_ANNOUCE_MODAL:
      return {
        ...state,
        annouce: {
          visible: false,
          data: {}
        }
      };
    case TOGGLE_ANNOUCE_MODAL:
      return {
        ...state,
        annouce: {
          visible: !state.annouce.visible,
          data: payload
        }
      };
    case OPEN_CARD_PREVIEW_MODAL:
      return {
        ...state,
        card: {
          visible: true,
          data: payload
        }
      };
    case CLOSE_CARD_PREVIEW_MODAL:
      return {
        ...state,
        card: {
          visible: false,
          data: {}
        }
      };
    case TOGGLE_CARD_PREVIEW_MODAL:
      return {
        ...state,
        card: {
          visible: !state.card.visible,
          data: payload
        }
      };
    case OPEN_SELECT_BRANCH_MODAL:
      return {
        ...state,
        selectBranch: true
      };
    case CLOSE_SELECT_BRANCH_MODAL:
      return {
        ...state,
        selectBranch: false
      };
    case TOGGLE_SELECT_BRANCH_MODAL:
      return {
        ...state,
        selectBranch: !state.selectBranch
      };
    case OPEN_SHIPPING_CHECK_MODAL:
      return {
        ...state,
        shipping_check: true
      };
    case CLOSE_SHIPPING_CHECK_MODAL:
      return {
        ...state,
        shipping_check: false
      };
    case TOGGLE_SHIPPING_CHECK_MODAL:
      return {
        ...state,
        shipping_check: !state.shipping_check
      };
    default:
      return state;
  }
};

export default modalReducer;
