import axios from "axios";

import { _API_ENDPOINT } from "../utils/config";

export const fetchSectorData = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/branch_sector/GET`);
};

export const fetchBranchData = sectorId => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/branch/GET?sectorId=${sectorId}`);
};
