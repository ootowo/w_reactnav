import {
  MAKE_CONFIG_ASYNC,
  SET_DEFAULT,
  FETCH_CONFIG,
  makeConfigAsyncDone,
  makeConfigAsyncReject,
  fetchConfigDone,
  fetchConfigReject
} from "../actions/settingAction";
import {
  fetchConfigFromDB,
  setConfigToDB,
  setNotification,
  setRingtoneNotification
} from "../apis/settingApi";
import { call, put, takeLatest } from "redux-saga/effects";

function* callMakeConfigAsyncSaga({ payload, resolve, reject, skip }) {
  if (!skip) {
    switch (payload.key) {
      case "ringtone":
        // yield call(setRingtoneNotification, payload.value);
        break;
      case "notification":
        // yield call(setNotification, payload.value);
        break;
    }
  }
  try {
    const result = yield call(setConfigToDB, {
      ...payload.oldSetting,
      [payload.key]: payload.value
    });
    yield call(resolve, result.res);
    yield put(makeConfigAsyncDone());
  } catch (e) {
    yield call(reject, e);
    yield put(makeConfigAsyncReject(e));
  }
}

function* callSetDefaultSaga() {
  // Store Setting params to db.
}

function* callFetchConfigSaga() {
  try {
    const config = yield call(fetchConfigFromDB);
    yield put(fetchConfigDone(config));
  } catch (e) {
    yield put(fetchConfigReject(e));
  }
}

export function* getMakeConfigAsyncSaga() {
  yield takeLatest(MAKE_CONFIG_ASYNC, callMakeConfigAsyncSaga);
}

export function* getSetDefaultSaga() {
  yield takeLatest(SET_DEFAULT, callSetDefaultSaga);
}

export function* getFetchConfigSaga() {
  yield takeLatest(FETCH_CONFIG, callFetchConfigSaga);
}
