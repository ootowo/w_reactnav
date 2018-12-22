import React, { Component } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  WebBrowser,
  Linking,
  StyleSheet
} from "react-native";
import Swiper from "react-native-swiper";

export class Banner extends Component {
  onPressOpenWebSite(address) {
    if (address) {
      Linking.openURL(address);
    }
  }

  render() {
    const { style, images, darkmode, mini, urls } = this.props;
    const { width } = Dimensions.get("window");
    const bannerHeight = width / (mini ? 4.5 : 3);

    if (images) {
      return (
        <View
          onLayout={this.props.onLayout}
          style={[
            {
              flex: 0,
              width: "100%",
              height: bannerHeight + 25,
              paddingBottom: 5
            },
            style
          ]}
        >
          <Swiper
            autoplay={true}
            autoplayTimeout={5}
            loop
            height={bannerHeight}
            dotStyle={darkmode ? styles.slideIndicator__dot_dark : styles.slideIndicator__dot}
            activeDotStyle={
              darkmode ? styles.slideIndicator__dot_dark_active : styles.slideIndicator__dot_active
            }
            paginationStyle={{
              bottom: 0
            }}
          >
            {images.map((image, key) => (
              <TouchableOpacity
                key={key}
                style={[styles.banner, { height: bannerHeight }]}
                onPress={() => this.onPressOpenWebSite(urls[key])}
              >
                <Image style={[styles.banner__image, { height: bannerHeight }]} source={image} />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  slideIndicator: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  slideIndicator__dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    opacity: 0.4,
    marginLeft: 5
  },
  slideIndicator__dot_active: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    opacity: 1,
    marginLeft: 5
  },
  slideIndicator__dot_dark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000000",
    opacity: 0.2,
    marginLeft: 5
  },
  slideIndicator__dot_dark_active: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000000",
    opacity: 0.7,
    marginLeft: 5
  },
  banner: {
    flex: 0,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#FFFFFF"
  },
  banner__image: {
    width: "100%",
    resizeMode: "cover"
  }
});
