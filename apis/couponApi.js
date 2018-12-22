import axios from "axios";
import { isEmpty } from "../utils/validate";
import { _API_ENDPOINT } from "../utils/config";

export const fetchCouponData = memberCode => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/member_coupon/GET?memberCode=${memberCode}`);
};

export const changeCouponToUsed = memberCode => {
  return axios.post(`${_API_ENDPOINT}MarketingAPI/member_coupon/GET?memberCode=${memberCode}`);
};
