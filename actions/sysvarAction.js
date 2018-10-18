export const SET_VAR = "SET_VAR";
export const setVar = (payload, resolve, reject) => ({
  type: SET_VAR,
  payload,
  resolve,
  reject
});
export const SET_VAR_DONE = "SET_VAR_DONE";
export const setVarDone = () => ({
  type: SET_VAR_DONE
});
export const SET_VAR_REJECT = "SET_VAR_REJECT";
export const setVarReject = payload => ({
  type: SET_VAR_REJECT,
  payload
});

export const GET_VAR = "GET_VAR";
export const getVar = () => ({
  type: GET_VAR
});
export const GET_VAR_DONE = "GET_VAR_DONE";
export const getVarDone = payload => ({
  type: GET_VAR_DONE,
  payload
});
export const GET_VAR_REJECT = "GET_VAR_REJECT";
export const getVarReject = payload => ({
  type: GET_VAR_REJECT,
  payload
});
