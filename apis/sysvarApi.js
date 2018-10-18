import { getData, setData, removeData } from "../db";
import { _DEFAULT_SYS_VAR } from "../utils/config";

export const fetchSystemVarFromDB = () => {
  return new Promise((resolve, reject) => {
    getData("sysVar", (error, res) => {
      if (res) {
        const { firstTime } = res;
        const config = { firstTime };
        resolve(config);
      } else {
        resolve(_DEFAULT_SYS_VAR);
      }
    });
  });
};

export const setSystemVarToDB = data => {
  return new Promise((resolve, reject) => {
    const newConfig = { _id: "sysVar", ...data };
    setData(newConfig, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
};

export const clearSystemVarFromDB = () => {
  return new Promise((resolve, reject) => {
    removeData("sysVar", success => {
      if (success) {
        resolve();
      } else {
        reject();
      }
    });
  });
};
