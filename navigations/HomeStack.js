import React from "react";
import { createStackNavigator } from "react-navigation";

import MainMenuScreen from "../screens/Home/MainMenu";
import CouponScreen from "../screens/Home/Coupon";
import MailScreen from "../screens/Home/Mail";
import ProductCatalogScreen from "../screens/Home/ProductCatalog";
import PrivillageScreen from "../screens/Home/Privillage";
import NewsScreen from "../screens/Home/News";
import EntertainmentScreen from "../screens/Home/Entertainment";
import OfficialWebScreen from "../screens/Home/OfficialWeb";
import OfferScreen from "../screens/Home/Offer";
import SettingScreen from "../screens/Home/Setting";

import MailViewScreen from "../screens/Home/MailView";
import ProductCatelogViewScreen from "../screens/Home/ProductCatelogView";
import NewsViewScreen from "../screens/Home/NewsView";
import EntertainmentViewScreen from "../screens/Home/EntertainmentView";
import OfferViewScreen from "../screens/Home/OfferView";

export default createStackNavigator({
  MainMenu: MainMenuScreen,
  Coupon: CouponScreen,
  Mail: MailScreen,
  ProductCatalog: ProductCatalogScreen,
  Privillage: PrivillageScreen,
  News: NewsScreen,
  Entertainment: EntertainmentScreen,
  OfficialWeb: OfficialWebScreen,
  Offer: OfferScreen,
  Setting: SettingScreen,

  MailView: MailViewScreen,

  NewsView: NewsViewScreen,
  ProductCatelogView: ProductCatelogViewScreen,
  EntertainmentView: EntertainmentViewScreen,
  OfferView: OfferViewScreen
});
