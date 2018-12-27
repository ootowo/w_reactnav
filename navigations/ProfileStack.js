import { createStackNavigator } from "react-navigation";
import React from "react";

import MainProfileScreen from "../screens/Profile/MainProfile";
import MyOrderScreen from "../screens/Profile/MyOrder";

export default createStackNavigator({
  MainProfile: MainProfileScreen,
  MyOrder: MyOrderScreen
});
