import { createStackNavigator } from "react-navigation";
import React from "react";

import MainProfileScreen from "../screens/Profile/MainProfile";
import MyOrderScreen from "../screens/Profile/MyOrder";
import ReOrderScreen from "../screens/Profile/ReOrder";
import ConfirmPaymentScreen from "../screens/Profile/ConfirmPayment";

export default createStackNavigator({
  MainProfile: MainProfileScreen,
  MyOrder: MyOrderScreen,
  ReOrder: ReOrderScreen,
  ConfirmPayment: ConfirmPaymentScreen
});
