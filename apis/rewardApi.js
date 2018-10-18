import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";

export const fetchRewardData = memberCode => {
  return axios.get(
    `${_API_ENDPOINT}UserAPI/member_reward/GET?memberCode=${memberCode}`
  );
};

export const changeRewardToUsed = memberCode => {
  return axios.post(
    `${_API_ENDPOINT}MarketingAPI/member_rewards/POST?memberCode=${memberCode}`
  );
};
