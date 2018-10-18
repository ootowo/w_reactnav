import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import ProductStack from "./ProductStack";
import PromotionStack from "./PromotionStack";
import BranchStack from "./BranchStack";
import ProfileStack from "./ProfileStack";

const generateNavIcon = (type, name, tintColor) => {
  const size = 25;
  if (type == "ionicons") {
    return <Ionicons name={name} size={size} color={tintColor} />;
  } else if (type == "font-awesome") {
    return <FontAwesome name={name} size={size} color={tintColor} />;
  }
};
let navigationConfig = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName, iconType;
      switch (routeName) {
        case "Home":
          iconType = "ionicons";
          iconName = "ios-home";
          break;
        case "Product":
          iconType = "ionicons";
          iconName = "ios-cart";
          break;
        case "Promotion":
          iconType = "font-awesome";
          iconName = "shopping-bag";
          break;
        case "Branch":
          iconType = "ionicons";
          iconName = "ios-pin";
          break;
        case "Profile":
          iconType = "ionicons";
          iconName = "ios-person";
          break;
      }
      return generateNavIcon(iconType, iconName, tintColor);
    }
  }),
  tabBarOptions: {
    activeTintColor: "red",
    inactiveTineColor: "gray"
  }
};
export default createBottomTabNavigator(
  {
    Home: HomeStack,
    // Product: ProductStack,
    // Promotion: PromotionStack,
    Branch: BranchStack,
    Profile: ProfileStack
  },
  navigationConfig
);
