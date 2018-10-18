import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchNewsData = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/news/GET`);
};
