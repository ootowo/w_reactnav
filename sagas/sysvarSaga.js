import {
  GET_VAR,
  SET_VAR,
  getVarDone,
  getVarReject,
  setVarDone,
  setVarReject
} from "../actions/sysvarAction";
import { call, put, takeLatest } from "redux-saga/effects";

import { fetchSystemVarFromDB, setSystemVarToDB } from "../apis/sysvarApi";

function* callGetVarSaga() {
  try {
    const result = yield call(fetchSystemVarFromDB);
    yield put(getVarDone, result);
  } catch (e) {
    yield put(getVarReject, e);
  }
}

function* callSetVarSaga({ payload, resolve, reject }) {
  try {
    const result = yield call(setSystemVarToDB, payload);
    yield put(setVarDone, result);
    yield call(resolve, result);
  } catch (e) {
    yield put(setVarReject, e);
    yield call(reject, e);
  }
}

export function* getGetVarSaga() {
  yield takeLatest(GET_VAR, callGetVarSaga);
}

export function* getSetVarSaga() {
  yield takeLatest(SET_VAR, callSetVarSaga);
}
