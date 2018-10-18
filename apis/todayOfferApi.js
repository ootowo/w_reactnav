import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchTodayOfferApi = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/offer/GET`);
};
