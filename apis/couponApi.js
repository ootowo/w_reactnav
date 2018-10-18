import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchCouponData = memberId => {
  return axios.get(
    `${_API_ENDPOINT}MarketingAPI/member_coupon/GET?memberId=${memberId}`
  );
};

export const changeCouponToUsed = memberId => {
  return axios.post(
    `${_API_ENDPOINT}MarketingAPI/member_coupon/POST?memberId=${memberId}`
  );
};
