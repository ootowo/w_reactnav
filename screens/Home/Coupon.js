import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import { BannerDark } from "../../components/Banner";

class CouponScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coupon",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  renderCouponItem = (item, key) => {
    return (
      <View key={key} style={styles.couponItem}>
        {item.image ? (
          <View style={styles.couponItem__thumbnail}>
            <Image
              style={styles.couponItem__thumbnail_image}
              source={item.image}
            />
          </View>
        ) : null}
        <View style={styles.couponItem__detail}>
          {item.offer ? (
            <Text style={styles.couponItem__detail_offertitle}>
              {item.offer}
            </Text>
          ) : null}
          <Text style={styles.couponItem__detail_offerdetail}>
            {item.detail}
          </Text>
          <Text style={styles.couponItem__detail_offerexpire}>
            {item.expire}
          </Text>
        </View>
        <TouchableOpacity style={styles.couponItem__submit}>
          <Text style={styles.couponItem__submit_text}>Use!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderUsedCoupon = (item, key) => {
    return (
      <View key={key} style={styles.couponItem}>
        {item.image ? (
          <View style={styles.couponItem__thumbnail}>
            <Image
              style={styles.couponItem__thumbnail_image}
              source={item.image}
            />
          </View>
        ) : null}
        <View style={styles.couponItem__detail}>
          {item.offer ? (
            <Text style={styles.couponItem__detail_offertitle}>
              {item.offer}
            </Text>
          ) : null}
          <Text style={styles.couponItem__detail_offerdetail}>
            {item.detail}
          </Text>
          <Text style={styles.couponItem__detail_offerexpire}>
            {item.expire}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    const mockup = [
      {
        id: 0,
        offer: "200 ฿",
        detail: "200 Baht off any order over 2000 Baht",
        expire: "Expire 20 Sep 2018"
      },
      {
        id: 1,
        offer: "500 ฿",
        detail: "500 Baht off any order over 5000 Baht",
        expire: "Expire 30 Sep 2018"
      }
    ];
    const mockup_used = [
      {
        id: 0,
        offer: "500 ฿",
        detail: "500 Baht off any order over 5000 Baht",
        expire: "Expire 30 Sep 2018"
      },
      {
        id: 1,
        image: {
          uri:
            "https://5.imimg.com/data5/OJ/GB/MY-3665829/fancy-basket-small-500x500.jpg"
        },
        detail: "Earn Plastic Basket when order over 200 Baht",
        expire: "Expire 30 Sep 2018"
      }
    ];
    return (
      <Container>
        <Tabs
          renderTabBar={() => (
            <ScrollableTab style={{ borderBottomWidth: 0 }} />
          )}
        >
          <Tab heading="Available">
            <View style={styles.container}>
              <ScrollView style={styles.couponList}>
                {mockup.map(this.renderCouponItem)}
              </ScrollView>
            </View>
          </Tab>
          <Tab heading="History">
            <View style={styles.container}>
              <ScrollView style={styles.couponList}>
                {mockup_used.map(this.renderUsedCoupon)}
              </ScrollView>
            </View>
          </Tab>
        </Tabs>
        <BannerDark
          image={{
            uri:
              "https://brandinside.asia/wp-content/uploads/2018/07/shutterstock_10451594111323r.jpg"
          }}
        />
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
    marginBottom: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    flexDirection: "row"
  },
  couponItem__thumbnail: {
    flex: 0,
    width: 60,
    marginLeft: 10,
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  couponItem__thumbnail_image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  couponItem__detail: {
    flex: 1,
    padding: 15,
    justifyContent: "center"
  },
  couponItem__detail_offertitle: {
    color: "#FF0000",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center"
  },
  couponItem__detail_offerdetail: {
    fontSize: 13,
    color: "#635F62",
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
