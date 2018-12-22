export const AUTHEN_LOGIN = "AUTHEN_LOGIN";
export const authenLogin = (payload, resolve, reject) => ({
  type: AUTHEN_LOGIN,
  payload,
  resolve,
  reject
});

export const AUTHEN_LOGIN_DONE = "AUTHEN_LOGIN_DONE";
export const authenLoginDone = payload => ({
  type: AUTHEN_LOGIN_DONE,
  payload
});

export const AUTHEN_LOGIN_REJECT = "AUTHEN_LOGIN_REJECT";
export const authenLoginReject = payload => ({
  type: AUTHEN_LOGIN_REJECT,
  payload
});

export const AUTHEN_FACEBOOK_LOGIN = "AUTHEN_FACEBOOK_LOGIN";
export const authenFacebookLogin = (payload, resolve, reject) => ({
  type: AUTHEN_FACEBOOK_LOGIN,
  payload,
  resolve,
  reject
});

export const AUTHEN_CLEAR = "AUTHEN_CLEAR";
export const authenClear = () => ({
  type: AUTHEN_CLEAR
});

// export const AUTHEN_LOGOUT = "AUTHEN_LOGOUT";
// export const authenLogout = () => ({
//   type: AUTHEN_LOGOUT
// });

// export const AUTHEN_LOGOUT_DONE = "AUTHEN_LOGOUT_DONE";
// export const authenLogoutDone = () => ({
//   type: AUTHEN_LOGOUT_DONE
// });

// export const AUTHEN_LOGOUT_REJECT = "AUTHEN_LOGOUT_REJECT";
// export const authenLogoutReject = payload => ({
//   type: AUTHEN_LOGOUT_REJECT,
//   payload
// });

export const SYNC_AUTHEN = "SYNC_AUTHEN";
export const syncAuthen = (resolve, reject) => ({
  type: SYNC_AUTHEN,
  resolve,
  reject
});

export const SYNC_AUTHEN_DONE = "SYNC_AUTHEN_DONE";
export const syncAuthenDone = payload => ({
  type: SYNC_AUTHEN_DONE,
  payload
});

export const SYNC_AUTHEN_REJECT = "SYNC_AUTHEN_REJECT";
export const syncAuthenReject = payload => ({
  type: SYNC_AUTHEN_REJECT,
  payload
});
