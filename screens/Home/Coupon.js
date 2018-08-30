import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";

class CouponScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coupon",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  renderCouponList() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.couponList}>
          <View style={styles.couponItem}>
            <View style={styles.couponItem__detail}>
              <Text style={styles.couponItem__detail_offertitle}>200 ฿</Text>
              <Text style={styles.couponItem__detail_offerdetail}>
                เมื่อซื้อสินค้าครบ 2000 บาท
              </Text>
              <Text style={styles.couponItem__detail_offerexpire}>
                Expire 20 Sep 2018
              </Text>
            </View>
            <TouchableOpacity style={styles.couponItem__submit}>
              <Text style={styles.couponItem__submit_text}>Use!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  render() {
    return (
      <Container>
        <Tabs
          renderTabBar={() => (
            <ScrollableTab style={{ borderBottomWidth: 0 }} />
          )}
        >
          <Tab heading="Available">{this.renderCouponList()}</Tab>
          <Tab heading="History" />
        </Tabs>
      </Container>
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
    shadowOpacity: 0.1,
    flexDirection: "row"
  },
  couponItem__detail: {
    flex: 1,
    padding: 15,
    justifyContent: "center"
  },
  couponItem__detail_offertitle: {
    color: "#FF0000",
    fontSize: 24,
    textAlign: "center"
  },
  couponItem__detail_offerdetail: {
    fontSize: 13,
    color: "#635F62",
    marginTop: 10,
    textAlign: "center"
  },
  couponItem__detail_offerexpire: {
    textAlign: "center",
    fontSize: 10,
    color: "#B1AFB0"
  },
  couponItem__submit: {
    flex: 0,
    width: 100,
    height: 100,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  couponItem__submit_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});

export default CouponScreen;
