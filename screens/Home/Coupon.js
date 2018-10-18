import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import { Banner } from "../../components/Banner";
import moment from "moment";
import { isEmpty } from "../../utils/validate";

import { openCouponModal } from "../../actions/modalAction";
import { fetchCouponData } from "../../apis/couponApi";

class CouponScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coupon",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      usedCoupon: [],
      availableCoupon: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchCouponData(1)
      .then(res => {
        this.setState({ loading: false });
        if (!isEmpty(res.data)) {
          this.setState({
            availableCoupon: res.data.available,
            usedCoupon: res.data.used
          });
        } else {
          Alert.alert(
            "Makro",
            "These coupons are provided for our members only."
          );
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        Alert.alert("Error while loading", JSON.stringify(error));
      });
  }

  renderCouponItem = (item, key) => {
    const expireDate = moment(item.expireDate, "DD/MM/YYYY");
    console.log(item);
    return (
      <View
        key={key}
        style={[
          styles.couponItem,
          expireDate < Date.now() ? styles.couponItem_expired : null
        ]}
      >
        {item.imagePath ? (
          <View style={styles.couponItem__thumbnail}>
            <Image
              style={styles.couponItem__thumbnail_image}
              source={{ uri: item.imagePath }}
            />
          </View>
        ) : null}
        <View style={styles.couponItem__detail}>
          {!isEmpty(item.name.trim()) ? (
            <Text style={styles.couponItem__detail_offertitle}>
              {item.name}
            </Text>
          ) : null}
          <Text style={styles.couponItem__detail_offerdetail}>
            {item.description}
          </Text>
          <Text
            style={[
              styles.couponItem__detail_offerexpire,
              item.expired
                ? styles.couponItem__detail_offerexpired
                : styles.couponItem__detail_offernotexpire
            ]}
          >
            {expireDate < Date.now()
              ? "Expired"
              : "Expire on " + expireDate.format("D MMMM YYYY")}
          </Text>
        </View>
        <Image
          style={styles.couponItem__sep}
          source={require("../../assets/coupon_sep/coupon_sep.png")}
        />
        <TouchableOpacity
          style={styles.couponItem__submit}
          onPress={() => this.props.openCouponModal(item)}
        >
          <Text style={styles.couponItem__submit_text}>Use Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderUsedCoupon = (item, key) => {
    return (
      <View
        key={key}
        style={[
          styles.couponItem,
          item.expired ? styles.couponItem_expired : null
        ]}
      >
        {item.imagePath ? (
          <View style={styles.couponItem__thumbnail}>
            <Image
              style={styles.couponItem__thumbnail_image}
              source={{ uri: item.imagePath }}
            />
          </View>
        ) : null}
        <View style={styles.couponItem__detail}>
          {!isEmpty(item.name.trim()) ? (
            <Text style={styles.couponItem__detail_offertitle}>
              {item.name}
            </Text>
          ) : null}
          <Text style={styles.couponItem__detail_offerdetail}>
            {item.detail}
          </Text>
          <Text
            style={[
              styles.couponItem__detail_offerexpire,
              item.expired
                ? styles.couponItem__detail_offerexpired
                : styles.couponItem__detail_offernotexpire
            ]}
          >
            {item.expired ? "Expired" : "Expire on " + item.expire}
          </Text>
          <Text style={styles.couponItem__detail_offeruseat}>
            Used at {item.used_at}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { availableCoupon, usedCoupon, loading } = this.state;
    const { coupon } = this.props.banner;
    const couponBannerImages = coupon.map(banner => {
      return {
        uri: banner.filePath
      };
    });
    const couponBannerURLs = coupon.map(banner => {
      return banner.url;
    });

    return (
      <View style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>
          <Tabs
            tabBarUnderlineStyle={{ backgroundColor: "#FF0000" }}
            renderTabBar={() => (
              <ScrollableTab
                style={{ borderBottomWidth: 0, backgroundColor: "#f2f2f2" }}
              />
            )}
          >
            <Tab
              heading="Available"
              tabStyle={{ backgroundColor: "#f2f2f2" }}
              activeTabStyle={{ backgroundColor: "#f2f2f2" }}
              textStyle={{ color: "#FF0000" }}
              activeTextStyle={{ color: "#FF0000" }}
            >
              <View style={styles.container}>
                {loading ? (
                  <View
                    style={{
                      flex: 1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "#FFFFFF",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <ScrollView style={styles.couponList}>
                    {availableCoupon.map(this.renderCouponItem)}
                  </ScrollView>
                )}
              </View>
            </Tab>
            <Tab
              heading="History"
              tabStyle={{ backgroundColor: "#f2f2f2" }}
              activeTabStyle={{ backgroundColor: "#f2f2f2" }}
              textStyle={{ color: "#FF0000" }}
              activeTextStyle={{ color: "#FF0000" }}
            >
              <View style={styles.container}>
                <ScrollView style={styles.couponList}>
                  {/* {usedCoupon.map(this.renderUsedCoupon)} */}
                </ScrollView>
              </View>
            </Tab>
          </Tabs>
        </Container>
        <Banner
          darkmode
          mini
          images={couponBannerImages}
          urls={couponBannerURLs}
        />
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
    marginBottom: 15,
    flexDirection: "row"
  },
  couponItem_expired: {
    opacity: 0.65
  },
  couponItem__thumbnail: {
    flex: 0,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  couponItem__thumbnail_image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  couponItem__detail: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  couponItem__detail_offertitle: {
    color: "#FF0000",
    fontSize: 24,
    marginBottom: 5
  },
  couponItem__detail_offerdetail: {
    fontSize: 13,
    color: "#635F62"
  },
  couponItem__detail_offerexpire: {
    fontSize: 10
  },
  couponItem__detail_offernotexpire: {
    color: "#B1AFB0"
  },
  couponItem__detail_offerexpired: {
    color: "#FF0000"
  },
  couponItem__detail_offeruseat: {
    fontSize: 10,
    marginTop: 5
  },
  couponItem__sep: {
    width: 14,
    height: 100,
    resizeMode: "contain"
  },
  couponItem__submit: {
    flex: 0,
    width: 80,
    height: 100,
    backgroundColor: "#FF7D7D",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4
  },
  couponItem__submit_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  model: state.modalReducer,
  banner: state.bannerReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ openCouponModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponScreen);
