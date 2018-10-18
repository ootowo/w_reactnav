export const FETCH_BANNER = "FETCH_BANNER";
export const fetchBanner = () => ({
  type: FETCH_BANNER
});

export const FETCH_BANNER_DONE = "FETCH_BANNER_DONE";
export const fetchBannerDone = payload => ({
  type: FETCH_BANNER_DONE,
  payload
});

export const FETCH_BANNER_REJECT = "FETCH_BANNER_REJECT";
export const fetchBannerReject = payload => ({
  type: FETCH_BANNNER_REJECT,
  payload
});
