import axios from "axios";
import { isEmpty } from "../utils/validate";
import { _API_ENDPOINT } from "../utils/config";

export const fetchRewardData = memberCode => {
  return axios.get(`${_API_ENDPOINT}UserAPI/member_reward/GET?memberCode=${memberCode}`);
};

export const fetchRewardDetailData = (memberCode, memberRewardId) => {
  return axios.get(
    `${_API_ENDPOINT}UserAPI/member_rewarddata/GET?memberCode=${memberCode}&memberRewardId=${memberRewardId}`
  );
};

export const claimReward = (memberCode, memberRewardId, amount) => {
  return axios.get(
    `${_API_ENDPOINT}UserAPI/member_rewardclaim/GET?memberCode=${memberCode}&memberRewardId=${memberRewardId}&amount=${amount}`
  );
};

export const addPointReward = (memberCode, amount) => {
  return axios.get(
    `${_API_ENDPOINT}UserAPI/member_addpoint/GET?memberCode=${memberCode}&amount=${amount}`
  );
};

export const changeRewardToUsed = memberCode => {
  return axios.post(`${_API_ENDPOINT}UserAPI/member_reward/GET?memberCode=${memberCode}`);
};
