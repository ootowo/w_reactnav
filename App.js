import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/ka";
import "intl/locale-data/jsonp/th";
import { addLocaleData } from "react-intl";
import { AppLoading, Asset, Font } from "expo";
import { Provider } from "react-redux";
import { View, StatusBar, Platform, AppRegistry } from "react-native";
import React from "react";

import firebase from "expo-firebase-app";
import "expo-firebase-auth";
import "expo-firebase-analytics";
import "expo-firebase-database";
import "expo-firebase-messaging";
import "expo-firebase-instance-id";

import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons
} from "@expo/vector-icons";

import CoreApp from "./core/CoreApp";
import bgMessaging from "./utils/bgMessaging";
import configureStore from "./store";

Asset;
const enLocale = require("react-intl/locale-data/en");
const thLocale = require("react-intl/locale-data/th");
const kaLocale = require("react-intl/locale-data/ka");

addLocaleData([...enLocale, ...thLocale, ...kaLocale]);

console.disableYellowBox = true;

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
};

class App extends React.Component {
  state = {
    isReady: false
  };

  componentDidMount() {
    firebase.analytics();
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      // Coupon Seperator
      require("./assets/coupon_sep/coupon_sep.png"),

      // Shelf Preview
      require("./assets/shelfs/shelf_style_1/preview/shelf.png"),
      require("./assets/shelfs/shelf_style_2/preview/shelf.png"),
      require("./assets/shelfs/shelf_style_3/preview/shelf.png"),
      require("./assets/shelfs/shelf_style_4/preview/shelf.png"),
      require("./assets/shelfs/shelf_style_5/preview/shelf.png"),

      require("./assets/shelfs/shelf_style_1/left/shelf.png"),
      require("./assets/shelfs/shelf_style_2/left/shelf.png"),
      require("./assets/shelfs/shelf_style_3/left/shelf.png"),
      require("./assets/shelfs/shelf_style_4/left/shelf.png"),
      require("./assets/shelfs/shelf_style_5/left/shelf.png"),

      require("./assets/shelfs/shelf_style_1/right/shelf.png"),
      require("./assets/shelfs/shelf_style_2/right/shelf.png"),
      require("./assets/shelfs/shelf_style_3/right/shelf.png"),
      require("./assets/shelfs/shelf_style_4/right/shelf.png"),
      require("./assets/shelfs/shelf_style_5/right/shelf.png"),

      require("./assets/home_bg.png"),
      require("./assets/makro_cam_logo.png"),
      require("./assets/makro_card.png"),

      require("./assets/card_preview/card.png"),
      require("./assets/card_thumbnail/card.png")
    ]);
    const fontAssets = cacheFonts([
      {
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      },
      ...FontAwesome.font,
      ...Ionicons.font,
      ...Entypo.font,
      ...MaterialIcons.font,
      ...MaterialCommunityIcons.font,
      ...Octicons.font
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    const store = configureStore();
    if (this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
          <StatusBar translucent backgroundColor={"#000000"} />
          <CoreApp />
        </View>
      </Provider>
    );
  }
}

export default App;
AppRegistry.registerHeadlessTask("EXFirebaseBackgroundMessage", () => bgMessaging);
