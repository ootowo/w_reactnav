import { Permissions, Notifications } from "expo";
import axios from "axios";

import { _PUSH_ENDPOINT, _DEFAULT_SETTING } from "../utils/config";
import { setData, getData, removeData } from "../db";

export const fetchConfigFromDB = () => {
  return new Promise((resolve, reject) => {
    getData("settings", (error, res) => {
      if (res) {
        const { notification, ringtone, shelf, language, branch } = res;
        const config = {
          notification,
          ringtone,
          shelf,
          language,
          branch
        };
        resolve(config);
      } else {
        resolve(_DEFAULT_SETTING);
      }
    });
  });
};

export const setConfigToDB = data => {
  return new Promise((resolve, reject) => {
    const newConfig = { _id: "settings", ...data };
    setData(newConfig, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
};

export const clearConfigInDB = () => {
  return new Promise((resolve, reject) => {
    removeData("settings", success => {
      if (success) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

export const setRingtoneNotification = state => {
  Permissions.setRingtoneNotification(state);
  return true;
};

export const setNotification = state => {
  Permissions.setNotification(state);
  return true;
};

export const checkNotificationGrant = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  return finalStatus;
};

export const makeNotificationToken = async user => {
  let token = await Notifications.getExpoPushTokenAsync();

  const postBody = {
    token: {
      value: token
    },
    user: {
      username: user
    }
  };
  return axios.post(_PUSH_ENDPOINT, postBody);
};
