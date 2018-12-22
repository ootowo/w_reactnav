import axios from "axios";
import { isEmpty } from "../utils/validate";
import { _API_ENDPOINT } from "../utils/config";

export const fetchRewardData = memberCode => {
  return axios.get(`${_API_ENDPOINT}UserAPI/member_reward/GET?memberCode=${memberCode}`);
};

export const changeRewardToUsed = memberCode => {
  return axios.post(`${_API_ENDPOINT}UserAPI/member_rewards/GET?memberCode=${memberCode}`);
};
