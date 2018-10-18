import {
  FETCH_BANNER,
  fetchBannerDone,
  fetchBannerReject
} from "../actions/bannerAction";
import { call, put, takeLatest } from "redux-saga/effects";
import moment from "moment";

import { getBanner } from "../apis/bannerApi";

export function* getFetchBanner() {
  try {
    const results = yield call(getBanner);
    if (results.data) {
      const { data } = results;
      let donePayload = {
        home: [],
        coupon: [],
        mail: [],
        catalog: []
      };
      data.map(result => {
        const validFrom = moment(result.validFromDate, "YYYY-MM-DD"),
          validTo = moment(result.validToDate, "YYYY-MM-DD"),
          now = Date.now();
        if (validFrom <= now && validTo >= now) {
          if (result.destination.toLowerCase() == "home") {
            donePayload.home.push(result);
          } else if (result.destination.toLowerCase() == "coupon") {
            donePayload.coupon.push(result);
          } else if (result.destination.toLowerCase() == "makro mail") {
            donePayload.mail.push(result);
          } else if (result.destination.toLowerCase() == "catalog") {
            donePayload.catalog.push(result);
          }
        }
      });
      yield put(fetchBannerDone(donePayload));
    }
  } catch (error) {
    yield put(fetchBannerReject(error));
  }
}

export function* callFetchBanner() {
  yield takeLatest(FETCH_BANNER, getFetchBanner);
}
