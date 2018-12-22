import {
  SET_COUNTING_CATALOG,
  SET_COUNTING_COUPON,
  SET_COUNTING_MAIL,
  SET_COUNTING_OFFER,
  SET_COUNTING_REWARD
} from "../actions/countingAction";
import { call, put, takeLatest } from "redux-saga/effects";
import { setCountingToDB } from "../apis/countingApi";

function* callSetCountingCatalog({ payload }) {
  try {
    yield call(setCountingToDB, payload);
  } catch (error) {}
}
function* callSetCountingCoupon({ payload }) {
  try {
    yield call(setCountingToDB, payload);
  } catch (error) {}
}
function* callSetCountingMail({ payload }) {
  try {
    yield call(setCountingToDB, payload);
  } catch (error) {}
}
function* callSetCountingOffer({ payload }) {
  try {
    yield call(setCountingToDB, payload);
  } catch (error) {}
}
function* callSetCountingReward({ payload }) {
  try {
    yield call(setCountingToDB, payload);
  } catch (error) {}
}

export function* getSetCountingCatalog() {
  yield takeLatest(SET_COUNTING_CATALOG, callSetCountingCatalog);
}
export function* getSetCountingCoupon() {
  yield takeLatest(SET_COUNTING_COUPON, callSetCountingCoupon);
}
export function* getSetCountingMail() {
  yield takeLatest(SET_COUNTING_MAIL, callSetCountingMail);
}
export function* getSetCountingOffer() {
  yield takeLatest(SET_COUNTING_OFFER, callSetCountingOffer);
}
export function* getSetCountingReward() {
  yield takeLatest(SET_COUNTING_REWARD, callSetCountingReward);
}
