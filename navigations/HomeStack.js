import { createStackNavigator } from "react-navigation";
import React from "react";

import CouponScreen from "../screens/Home/Coupon";
import EntertainmentScreen from "../screens/Home/Entertainment";
import EntertainmentViewScreen from "../screens/Home/EntertainmentView";
import MailScreen from "../screens/Home/Mail";
import MailViewScreen from "../screens/Home/MailView";
import MainMenuScreen from "../screens/Home/MainMenu";
import NewsScreen from "../screens/Home/News";
import NewsViewScreen from "../screens/Home/NewsView";
import OfferScreen from "../screens/Home/Offer";
import OfferViewScreen from "../screens/Home/OfferView";
import OfficialWebScreen from "../screens/Home/OfficialWeb";
import PrivillageScreen from "../screens/Home/Privillage";
import ProductCatalogScreen from "../screens/Home/ProductCatalog";
import ProductCatelogViewScreen from "../screens/Home/ProductCatelogView";
import SettingScreen from "../screens/Home/Setting";
import ShelfSelectorScreen from "../screens/Home/ShelfSelector";
import RedemptionCouponScreen from "../screens/Home/RedemptionCoupon";

import MainRewardScreen from "../screens/Reward/MainReward";
import RewardRedeemScreen from "../screens/Reward/RewardRedeem";
import RewardProgramDetailScreen from "../screens/Reward/RewardProgramDetail";
import RewardUseScreen from "../screens/Reward/RewardUse";
import RewardUseSuccessScreen from "../screens/Reward/RewardUseSuccess";

export default createStackNavigator({
  MainMenu: MainMenuScreen,

  Coupon: CouponScreen,
  MainReward: MainRewardScreen,
  RewardRedeem: RewardRedeemScreen,
  RewardProgramDetail: RewardProgramDetailScreen,
  RewardUse: RewardUseScreen,
  RewardUseSuccess: RewardUseSuccessScreen,

  RedemptionCoupon: RedemptionCouponScreen,
  Mail: MailScreen,
  ProductCatalog: ProductCatalogScreen,
  // Privillage: PrivillageScreen,
  News: NewsScreen,
  Entertainment: EntertainmentScreen,
  OfficialWeb: OfficialWebScreen,
  Offer: OfferScreen,
  Setting: SettingScreen,
  ShelfSelector: ShelfSelectorScreen,

  MailView: MailViewScreen,
  NewsView: NewsViewScreen,
  ProductCatelogView: ProductCatelogViewScreen,
  EntertainmentView: EntertainmentViewScreen,
  OfferView: OfferViewScreen
});
