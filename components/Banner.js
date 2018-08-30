import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import css from "../styles";

export class Banner extends Component {
  render() {
    return (
      <View style={[{ width: "100%" }, this.props.style]}>
        <TouchableOpacity
          style={css.banner.banner}
          onPress={this.onPressBanner}
        >
          <Image style={css.banner.banner__image} source={this.props.image} />
        </TouchableOpacity>
        <View style={css.banner.slideIndicator}>
          <View
            style={[
              css.banner.slideIndicator__dot,
              css.banner.slideIndicator__dot_active
            ]}
          />
          <View style={css.banner.slideIndicator__dot} />
          <View style={css.banner.slideIndicator__dot} />
          <View style={css.banner.slideIndicator__dot} />
        </View>
      </View>
    );
  }
}

export class BannerDark extends Component {
  render() {
    return (
      <View style={[{ width: "100%" }, this.props.style]}>
        <TouchableOpacity
          style={css.banner.banner}
          onPress={this.onPressBanner}
        >
          <Image style={css.banner.banner__image} source={this.props.image} />
        </TouchableOpacity>
        <View style={css.banner.slideIndicator}>
          <View
            style={[
              css.banner.slideIndicator__dot_dark,
              css.banner.slideIndicator__dot_dark_active
            ]}
          />
          <View style={css.banner.slideIndicator__dot_dark} />
          <View style={css.banner.slideIndicator__dot_dark} />
          <View style={css.banner.slideIndicator__dot_dark} />
        </View>
      </View>
    );
  }
}
