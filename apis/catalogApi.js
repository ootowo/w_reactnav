import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchCatalogData = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/catalog/GET`);
};
