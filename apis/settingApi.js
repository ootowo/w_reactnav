import { Platform } from "react-native";
import { Permissions, Notifications } from "expo";
import axios from "axios";

import { _PUSH_ENDPOINT, _DEFAULT_SETTING, _API_ENDPOINT, _VERSION } from "../utils/config";
import { isEmpty } from "../utils/validate";
import { setData, getData, removeData } from "../db";

export const fetchConfigFromDB = () => {
  return new Promise((resolve, reject) => {
    getData("settings", (error, res) => {
      if (res) {
        const { notification, ringtone, shelf, language, branch, location } = res;
        const config = {
          notification,
          ringtone,
          shelf,
          language,
          branch,
          location
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

export const syncConfigToServer = (data, memberCode) => {
  // https://developers.awesys.asia/Makro/UserAPI/member_updatesettings/POST?memberCode=60100237140101&app_language=en
  /*
    app_platform (string)
    app_version (string)
    app_is_get_notification (boolean)
    app_language (string)
    app_shelf_style (string)
    branch_id (int)
  */
  /*
    {
      "branch": 0,
      "language": "en",
      "location": false,
      "notification": false,
      "ringtone": false,
      "shelf": 4,
    }
  */
  if (!isEmpty(memberCode)) {
    const { branch, language, notification, shelf } = data;
    const postData = {
      app_platform: Platform.OS,
      app_version: _VERSION,
      app_is_get_notification: notification,
      app_language: language,
      app_shelf_style: shelf,
      branch_id: branch
    };
    return axios({
      method: "post",
      url: `${_API_ENDPOINT}UserAPI/member_updatesettings/POST?memberCode=${memberCode}&app_language=${language}`,
      data: postData,
      headers: { "Content-Type": "application/json" }
    });
  } else {
    return null;
  }
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

export const makeNotificationToken = async () => {
  let token = await Notifications.getExpoPushTokenAsync();
  return token;
};
