import axios from "axios";
import { isEmpty } from "../utils/validate";
import { _API_ENDPOINT } from "../utils/config";

export const fetchEntertainmentData = memberCode => {
  if (!isEmpty(memberCode)) {
    return axios.get(`${_API_ENDPOINT}MarketingAPI/multimedia/GET?memberCode=${memberCode}`);
  } else {
    return axios.get(`${_API_ENDPOINT}MarketingAPI/multimedia/GET`);
  }
};
