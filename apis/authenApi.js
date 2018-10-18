import { _API_ENDPOINT } from "../utils/config";
import axios from "axios";
import { setData, removeData } from "../db";

export const authenCheck = userData => {
  return axios.post(`${_API_ENDPOINT}UserAPI/member_auth/GET`, userData);
};

export const saveUserToDB = userData => {
  const newConfig = { _id: "user", ...data };
  return new Promise((resolve, reject) => {
    setData(newConfig, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
};

export const fetchUserFromDB = () => {
  return new Promise((resolve, reject) => {
    getData("user", (error, res) => {
      if (res) {
        const {
          id,
          member_code,
          user_id,
          type,
          first_name,
          last_name,
          current_point,
          valid_from_date,
          valid_to_date,
          is_enabled,
          create_date,
          create_by,
          update_date,
          update_by,
          deleted,
          facebook_access_token
        } = res;
        const user = {
          id,
          member_code,
          user_id,
          type,
          first_name,
          last_name,
          current_point,
          valid_from_date,
          valid_to_date,
          is_enabled,
          create_date,
          create_by,
          update_date,
          update_by,
          deleted,
          facebook_access_token
        };
        resolve(user);
      } else {
        reject();
      }
    });
  });
};

export const removeUserFromDB = () => {
  return new Promise((resolve, reject) => {
    removeData("user", success => {
      if (success) {
        resolve();
      } else {
        reject();
      }
    });
  });
};
