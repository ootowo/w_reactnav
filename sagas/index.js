import { all, fork } from "redux-saga/effects";

import * as bannerSagas from "./bannerSaga";
import * as settingSagas from "./settingSaga";
import * as sysvarSagas from "./sysvarSaga";
import * as userSagas from "./userSaga";
import * as countingSagas from "./countingSaga";
import * as popupSagas from "./popupSaga";

export default function* rootSaga() {
  yield all(
    [
      ...Object.values(settingSagas),
      ...Object.values(sysvarSagas),
      ...Object.values(userSagas),
      ...Object.values(bannerSagas),
      ...Object.values(countingSagas),
      ...Object.values(popupSagas)
    ].map(fork)
  );
}
