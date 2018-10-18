import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const getBanner = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/banner/GET`);
};
