export const FETCH_POPUP = "FETCH_POPUP";
export const fetchPopup = (payload, resolve, reject) => ({
  type: FETCH_POPUP,
  payload,
  resolve,
  reject
});

export const FETCH_POPUP_DONE = "FETCH_POPUP_DONE";
export const fetchPopupDone = payload => ({
  type: FETCH_POPUP_DONE,
  payload
});

export const FETCH_POPUP_REJECT = "FETCH_POPUP_REJECT";
export const fetchPopupReject = payload => ({
  type: FETCH_POPUP_REJECT,
  payload
});
