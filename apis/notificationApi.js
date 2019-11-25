import axios from "axios";
import { isEmpty } from "../utils/validate";
import { _API_ENDPOINT } from "../utils/config";

export const updatePushTokenData = (memberId, token) => {
  return axios.get(
    `${_API_ENDPOINT}UserAPI/member_check_refresh/GET?memberId=${memberId}&refreshToken=${token}`
  );
};
