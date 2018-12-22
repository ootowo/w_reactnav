export const SET_COUNTING_INTERNAL = "SET_COUNTING_INTERNAL";
export const SET_COUNTING_EXTERNAL = "SET_COUNTING_EXTERNAL";

export const setCountingInternal = payload => ({
  type: SET_COUNTING_INTERNAL,
  payload
});
export const setCountingExternal = payload => ({
  type: SET_COUNTING_EXTERNAL,
  payload
});

export const SET_COUNTING_COUPON = "SET_COUNTING_COUPON";
export const SET_COUNTING_MAIL = "SET_COUNTING_MAIL";
export const SET_COUNTING_CATALOG = "SET_COUNTING_CATALOG";
export const SET_COUNTING_OFFER = "SET_COUNTING_OFFER";
export const SET_COUNTING_REWARD = "SET_COUNTING_REWARD";

export const setCountingCoupon = payload => ({
  type: SET_COUNTING_COUPON,
  payload
});
export const setCountingMail = payload => ({
  type: SET_COUNTING_MAIL,
  payload
});
export const setCountingCatalog = payload => ({
  type: SET_COUNTING_CATALOG,
  payload
});
export const setCountingOffer = payload => ({
  type: SET_COUNTING_OFFER,
  payload
});
export const setCountingReward = payload => ({
  type: SET_COUNTING_REWARD,
  payload
});
