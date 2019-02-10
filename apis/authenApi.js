import axios from "axios";

import { _API_ENDPOINT } from "../utils/config";
import { getData, setData, removeData } from "../db";

export const authenCheck = memberCode => {
  if (memberCode) {
    return axios.get(`${_API_ENDPOINT}UserAPI/member_auth/GET?memberCode=${memberCode}`);
  } else {
    return null;
  }
};

export const authenFacebook = ({ id, accessToken, email, first_name, last_name, picture }) => {
  return axios.get(
    `${_API_ENDPOINT}UserAPI/member_auth/GET?facebook_id=${id}&accessToken=${accessToken}&email=${email}&first_name=${first_name}&last_name=${last_name}&picture=${picture}`
  );
};

export const saveUserToDB = userData => {
  const newConfig = { _id: "user", ...userData };
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
          email,
          name,
          // first_name,
          // last_name,
          branch_id,
          member_group_id,
          current_point,
          valid_from_date,
          valid_to_date,
          is_enabled,
          create_date,
          create_by,
          update_date,
          update_by,
          deleted,
          facebook_access_token,
          picture_path
        } = res;
        const user = {
          id,
          member_code,
          user_id,
          email,
          name,
          // first_name,
          // last_name,
          branch_id,
          member_group_id,
          current_point,
          valid_from_date,
          valid_to_date,
          is_enabled,
          create_date,
          create_by,
          update_date,
          update_by,
          deleted,
          facebook_access_token,
          picture_path
        };
        resolve(user);
      } else {
        resolve({});
        // reject(error);
      }
    });
  });
};

export const deConstructureFacebookData = ({ server, payload }) => {
  return {
    id: server.id,
    member_code: server.member_code,
    user_id: server.user_id,
    email: payload.email,
    name: payload.first_name + " " + payload.last_name,
    // first_name: payload.first_name,
    // last_name: payload.last_name,
    branch_id: server.branch_id,
    member_group_id: server.member_group_id,
    current_point: server.current_point,
    valid_from_date: server.valid_from_date,
    valid_to_date: server.valid_to_date,
    is_enabled: server.is_enabled,
    create_date: server.create_date,
    create_by: server.create_by,
    update_date: server.update_date,
    update_by: server.update_by,
    deleted: server.deleted,
    facebook_access_token: payload.accessToken,
    picture_path: payload.picture
  };
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
