import React from "react";
import { Provider } from "react-redux";
import { AppLoading, Asset, Font } from "expo";
import { Text, View } from "react-native";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import th from "react-intl/locale-data/th";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import CoreNavigation from "./navigations";
import CoreModal from "./modals";

import store from "./store";

const __DEFAULT_LOCALE = "en";
addLocaleData(en);
addLocaleData(th);

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

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    ]);
    const fontAssets = cacheFonts([
      {
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      },
      ...FontAwesome.font,
      ...Ionicons.font
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
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
        <IntlProvider locale={__DEFAULT_LOCALE} textComponent={Text}>
          <View style={{ width: "100%", height: "100%" }}>
            <CoreNavigation />
            <CoreModal />
          </View>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
