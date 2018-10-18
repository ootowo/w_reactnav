import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchMakroMailData = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/mail/GET`);
};
