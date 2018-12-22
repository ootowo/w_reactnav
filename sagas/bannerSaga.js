import { FETCH_BANNER, fetchBannerDone, fetchBannerReject } from "../actions/bannerAction";
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
        const validFrom = moment(result["valid_from_date"], "YYYY-MM-DD HH:mm:ss"),
          validTo = moment(result["valid_to_date"], "YYYY-MM-DD HH:mm:ss"),
          now = Date.now();
        if (validFrom <= now && validTo >= now) {
          if (result.destination.trim().toLowerCase() == "home") {
            donePayload.home.push(result);
          } else if (result.destination.trim().toLowerCase() == "coupon") {
            donePayload.coupon.push(result);
          } else if (result.destination.trim().toLowerCase() == "makro mail") {
            donePayload.mail.push(result);
          } else if (result.destination.trim().toLowerCase() == "catalog") {
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
