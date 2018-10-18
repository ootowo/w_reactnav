export const MAKE_CONFIG = "MAKE_CONFIG";
export const makeConfig = payload => ({
  type: MAKE_CONFIG,
  payload
});

export const MAKE_CONFIG_ASYNC = "MAKE_CONFIG_ASYNC";
export const makeConfigAsync = (payload, resolve, reject, skip = false) => ({
  type: MAKE_CONFIG_ASYNC,
  payload,
  resolve,
  reject,
  skip
});
export const MAKE_CONFIG_ASYNC_DONE = "MAKE_CONFIG_ASYNC_DONE";
export const makeConfigAsyncDone = () => ({
  type: MAKE_CONFIG_ASYNC_DONE
});
export const MAKE_CONFIG_ASYNC_REJECT = "MAKE_CONFIG_ASYNC_REJECT";
export const makeConfigAsyncReject = payload => ({
  type: MAKE_CONFIG_ASYNC_REJECT,
  payload
});

export const SET_DEFAULT = "SET_DEFAULT";
export const setDefault = () => ({
  type: SET_DEFAULT,
  payload
});

export const SYNC_CONFIG = "SYNC_CONFIG";
export const syncConfig = payload => ({
  type: SYNC_CONFIG,
  payload
});

export const FETCH_CONFIG = "GET_CONFIG";
export const fetchConfig = payload => ({
  type: FETCH_CONFIG,
  payload
});

export const FETCH_CONFIG_DONE = "FETCH_CONFIG_DONE";
export const fetchConfigDone = () => ({
  type: FETCH_CONFIG_DONE
});

export const FETCH_CONFIG_REJECT = "FETCH_CONFIG_REJECT";
export const fetchConfigReject = payload => ({
  type: FETCH_CONFIG_REJECT,
  payload
});
