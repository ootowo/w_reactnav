import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

class CouponScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coupon",
    headerTintColor: "#000000",
    headerBackTitle: null
  });
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.couponList}>
          <View style={styles.couponItem} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E4E4"
  },
  couponList: {
    padding: 10
  },
  couponItem: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.1
  }
});

export default CouponScreen;
