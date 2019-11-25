import { FETCH_POPUP, fetchPopupDone, fetchPopupReject } from "../actions/popupAction";
import { call, put, takeLatest } from "redux-saga/effects";
import moment from "moment";

import { isEmpty } from "../utils/validate";
import { fetchPopupData } from "../apis/popupApi";

export function* callFetchPopupSaga({ payload, resolve, reject }) {
  try {
    const result = yield call(fetchPopupData, payload);
    if (!isEmpty(result.data)) {
      const popupData = result.data.map(data => {
        const validFrom = moment(result["start_date"] + " 00:00:00", "YYYY-MM-DD HH:mm:ss"),
          validTo = moment(result["end_date"] + " 23:59:59", "YYYY-MM-DD HH:mm:ss"),
          now = Date.now();
        if (validFrom <= now && validTo >= now) {
          return data;
        }
        return data;
      });
      yield put(fetchPopupDone(popupData));
      if (resolve) {
        yield call(resolve, popupData);
      }
    } else {
      yield put(fetchPopupReject([]));
      if (resolve) {
        yield call(resolve, []);
      }
    }
  } catch (error) {
    yield put(fetchPopupReject(error));
    if (reject) {
      yield call(reject, error.message);
    }
  }
}

export function* getFetchPopupSaga() {
  yield takeLatest(FETCH_POPUP, callFetchPopupSaga);
}
