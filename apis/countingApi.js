import { fetchCouponData } from "./couponApi";
import { fetchCatalogData } from "./catalogApi";
import { fetchMakroMailData } from "./makroMailApi";
import { fetchTodayOfferApi } from "./todayOfferApi";
import { fetchRewardData } from "./rewardApi";
import { getData, setData } from "../db";

export const fetchAllDataLength = (memberCode, cb) => {
  Promise.all([
    fetchCouponData(memberCode),
    fetchCatalogData(memberCode),
    fetchMakroMailData(memberCode),
    fetchTodayOfferApi(memberCode),
    fetchRewardData(memberCode)
  ]).then(values => {
    var dataLength = {
      coupon: 0,
      catalog: 0,
      mail: 0,
      offer: 0,
      reward: 0
    };
    var i = 0;
    values.map(value => {
      if (i == 0) {
        // CouponAPI
        dataLength.coupon = value.data.available ? value.data.available.length : 0;
      } else if (i == 1) {
        // CatalogAPI
        dataLength.catalog = value.data ? value.data.length : 0;
      } else if (i == 2) {
        // MakroMailAPI
        dataLength.mail = value.data ? value.data.length : 0;
      } else if (i == 3) {
        // TodayOfferAPI
        dataLength.offer = value.data ? value.data.length : 0;
      } else if (i == 4) {
        // RewardAPI
        dataLength.reward = value.data.available ? value.data.available.length : 0;
        cb(dataLength);
      }
      i++;
    });
  });
};

export const setCountingToDB = data => {
  const newCounter = { _id: "counter", ...data };
  return new Promise((resolve, reject) => {
    setData(newCounter, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
};

export const fetchCountingFromDB = () => {
  return new Promise((resolve, reject) => {
    getData("counter", (error, res) => {
      if (res) {
        const data = {
          coupon: 0,
          catalog: 0,
          mail: 0,
          offer: 0,
          reward: 0
        };
        if (res.coupon) {
          data.coupon = res.coupon;
        }
        if (res.catalog) {
          data.catalog = res.catalog;
        }
        if (res.mail) {
          data.mail = res.mail;
        }
        if (res.offer) {
          data.offer = res.offer;
        }
        if (res.reward) {
          data.reward = res.reward;
        }
        resolve(data);
      } else {
        resolve({ coupon: 0, catalog: 0, mail: 0, offer: 0, reward: 0 });
      }
    });
  });
};
