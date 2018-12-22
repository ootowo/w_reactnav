import {
  AUTHEN_LOGIN,
  AUTHEN_FACEBOOK_LOGIN,
  SYNC_AUTHEN,
  // AUTHEN_LOGOUT,
  syncAuthenDone,
  syncAuthenReject,
  authenLoginDone,
  authenLoginReject
  // authenLogoutDone,
  // authenLogoutReject
} from "../actions/userAction";
import { call, put, takeLatest, take } from "redux-saga/effects";
import { Base64 } from "js-base64";
import { isEmpty } from "../utils/validate";

import {
  authenCheck,
  authenFacebook,
  saveUserToDB,
  fetchUserFromDB,
  removeUserFromDB,
  deConstructureFacebookData
} from "../apis/authenApi";

export function* callAuthenLoginSaga({ payload, resolve, reject }) {
  try {
    const result = yield call(authenCheck, payload);
    if (!isEmpty(result.data)) {
      const userData = result.data[0];
      yield call(saveUserToDB, userData);
      yield put(authenLoginDone(userData));
      if (resolve) {
        yield call(resolve, userData);
      }
    } else {
      yield put(authenLoginReject("User not found"));
      if (reject) {
        yield call(reject, "User not found");
      }
    }
  } catch (error) {
    yield put(authenLoginReject(error));
    if (reject) {
      yield call(reject, error);
    }
  }
}

export function* callAuthenFacebookLoginSaga({ payload, resolve, reject }) {
  try {
    payload.picture = payload.picture ? Base64.encode(payload.picture.data.url) : "";
    const result = yield call(authenFacebook, payload);
    if (!isEmpty(result.data)) {
      const userData = yield call(deConstructureFacebookData, {
        server: result.data[0],
        payload
      });
      yield call(saveUserToDB, userData);
      yield put(authenLoginDone(userData));
      if (resolve) {
        yield call(resolve, userData);
      }
    } else {
      yield put(authenLoginReject("User not found"));
      if (reject) {
        yield call(reject, "User not found");
      }
    }
  } catch (error) {
    yield put(authenLoginReject(error.message));
    if (reject) {
      yield call(reject, error.message);
    }
  }
}

// export function* callAuthenLogoutSaga() {
//   try {
//     const result = yield call(removeUserFromDB);
//     if (result) {
//       yield put(authenLogoutDone());
//     } else {
//       yield put(authenLogoutReject("Failed"));
//     }
//   } catch (error) {
//     console.log("Logout Error: " + error);
//     yield put(authenLogoutReject(error));
//   }
// }

export function* callSyncAuthenSaga({ resolve, reject }) {
  try {
    const result = yield call(fetchUserFromDB);
    if (!isEmpty(result)) {
      yield put(syncAuthenDone(result));
      if (resolve) {
        yield call(resolve, result);
      }
    } else {
      yield put(syncAuthenDone({}));
      if (resolve) {
        yield call(resolve, {});
      }
    }
  } catch (error) {
    yield put(syncAuthenReject(error.message));
    if (reject) {
      yield call(reject, error.message);
    }
  }
}

export function* getAuthenLoginSaga() {
  yield takeLatest(AUTHEN_LOGIN, callAuthenLoginSaga);
}

export function* getAuthenFacebookLoginSaga() {
  yield takeLatest(AUTHEN_FACEBOOK_LOGIN, callAuthenFacebookLoginSaga);
}

// export function* getAuthenLogoutSaga() {
//   yield takeLatest(AUTHEN_LOGOUT, callAuthenLogoutSaga);
// }

export function* getSyncAuthenSaga() {
  yield takeLatest(SYNC_AUTHEN, callSyncAuthenSaga);
}
