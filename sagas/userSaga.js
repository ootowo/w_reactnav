import {
  AUTHEN_LOGIN,
  AUTHEN_FACEBOOK_LOGIN,
  SYNC_AUTHEN,
  AUTHEN_LOGOUT,
  syncAuthenDone,
  syncAuthenReject,
  authenLoginDone,
  authenLoginReject,
  authenLogoutDone,
  authenLogoutReject
} from "../actions/userAction";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  authenCheck,
  saveUserToDB,
  fetchUserFromDB,
  removeUserFromDB
} from "../apis/authenApi";

export function* callAuthenLoginSaga({ payload }) {
  try {
    const result = yield call(authenCheck, payload);
    yield call(saveUserToDB, result.data);
    yield put(authenLoginDone(result.data));
  } catch (error) {
    yield put(authenLoginReject(error));
  }
}

export function* callAuthenFacebookLoginSaga({ payload }) {
  try {
    const result = yield call(authenCheck, payload);
    yield call(saveUserToDB, result.data);
    yield put(authenLoginDone(result.data));
  } catch (error) {
    yield put(authenLoginReject(error));
  }
}

export function* callAuthenLogoutSaga() {
  try {
    const result = yield call(removeUserFromDB);
    yield put(authenLogoutDone());
  } catch (error) {
    yield put(authenLogoutReject(error));
  }
}

export function* callSyncAuthenSaga() {
  try {
    const result = yield call(fetchUserFromDB);
    yield put(syncAuthenDone, result);
  } catch (error) {
    yield put(syncAuthenReject(error));
  }
}

export function* getAuthenLoginSaga() {
  yield takeLatest(AUTHEN_LOGIN, callAuthenLoginSaga);
}

export function* getAuthenFacebookLoginSaga() {
  yield takeLatest(AUTHEN_FACEBOOK_LOGIN, callAuthenFacebookLoginSaga);
}

export function* getAuthenLogoutSaga() {
  yield takeLatest(AUTHEN_LOGOUT, callAuthenLogoutSaga);
}

export function* getSyncAuthenSaga() {
  yield takeLatest(SYNC_AUTHEN, callSyncAuthenSaga);
}
