import { createBottomTabNavigator } from "react-navigation";
import { FormattedMessage } from "react-intl";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import React from "react";

import BranchStack from "./BranchStack";
import HomeStack from "./HomeStack";
import ProductStack from "./ProductStack";
import ProfileStack from "./ProfileStack";
import PromotionStack from "./PromotionStack";

const generateNavIcon = (type, name, tintColor) => {
  const size = 25;
  if (type == "ionicons") {
    return <Ionicons name={name} size={size} color={tintColor} />;
  } else if (type == "font-awesome") {
    return <FontAwesome name={name} size={size} color={tintColor} />;
  }
};
const generateNavLabel = (id, tintColor) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 12,
          color: tintColor
        }}
      >
        <FormattedMessage id={id} />
      </Text>
    </View>
  );
};
let navigationConfig = {
  defaultNavigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state;
    let tabBarLabel, tabBarIconName, tabBarIconType;
    switch (routeName) {
      case "Home":
        tabBarIconType = "ionicons";
        tabBarIconName = "ios-home";
        tabBarLabel = "home";
        break;
      case "Product":
        tabBarIconType = "ionicons";
        tabBarIconName = "ios-cart";
        tabBarLabel = "product";
        break;
      case "Promotion":
        tabBarIconType = "font-awesome";
        tabBarIconName = "shopping-bag";
        tabBarLabel = "promotion";
        break;
      case "Branch":
        tabBarIconType = "ionicons";
        tabBarIconName = "ios-pin";
        tabBarLabel = "branch";
        break;
      case "Profile":
        tabBarIconType = "ionicons";
        tabBarIconName = "ios-person";
        tabBarLabel = "profile";
        break;
    }
    return {
      tabBarIcon: ({ focused, tintColor }) => {
        return generateNavIcon(tabBarIconType, tabBarIconName, tintColor);
      },
      tabBarLabel: ({ focused, tintColor }) => {
        return generateNavLabel(tabBarLabel, tintColor);
      }
    };
  },
  tabBarOptions: {
    activeTintColor: "red",
    inactiveTineColor: "gray"
  }
};
export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Product: ProductStack,
    Promotion: PromotionStack,
    Branch: BranchStack,
    Profile: ProfileStack
  },
  navigationConfig
);
