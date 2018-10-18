import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchEntertainmentData = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/entertainment/GET`);
};
