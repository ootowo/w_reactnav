import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchSectorData = () => {
  return axios.get(`${_API_ENDPOINT}MarketingAPI/branch_sector/GET`);
};

export const fetchBranchData = sectorId => {
  return axios.get(
    `${_API_ENDPOINT}MarketingAPI/branch/GET?sectorId=${sectorId}`
  );
};
