import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";

import { List, ListItem } from "react-native-elements";
import { Container, Tab, Tabs, ScrollableTab } from "native-base";

import { fetchCouponData } from "../../apis/couponApi";
import HeaderTitle from "../../components/HeaderTitle";
import { isEmpty } from "../../utils/validate";
import { openCouponModal } from "../../actions/modalAction";

class RedemptionCouponScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="coupon" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      redmpCoupon: [],
      history: []
    };

    this.renderCouponItem = this.renderCouponItem.bind(this);
    this.makeMockupData = this.makeMockupData.bind(this);
  }

  componentDidMount() {
    this.makeMockupData();
    // Fetch Data
    // this.setState({ loading: true });
    // fetchCouponData(this.props.user.user.member_code)
    //   .then(res => {
    //     if (!isEmpty(res.data)) {
    //       this.setState({
    //         redmpCoupon: isEmpty(res.data.available) ? [] : res.data.available,
    //         usedCoupon: isEmpty(res.data.used) ? [] : res.data.used
    //       });
    //     }
    //     this.setState({ loading: false });
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //     console.log(error.message);
    //     Alert.alert("Makro", "Error while loading, please try again");
    //   });
  }

  makeMockupData() {
    this.setState({
      redmpCoupon: [
        {
          name: "Redeemed Coupon",
          name_cambodia: "Redeemed Coupon",
          description: "Test Description",
          description_cambodia: "Test Description",
          expireDate: new Date(2018, 12, 12, 12, 0, 0),
          imagePath: "https://www.siammakro.co.th/images/foodservice.jpg",
          code: "0123456789012",
          redeemed: true,
          used: false
        }
      ],
      historyCoupon: [
        {
          name: "Used Coupon",
          name_cambodia: "Redeemed Coupon",
          description: "Test Description",
          description_cambodia: "Test Description",
          expireDate: new Date(2018, 12, 12, 12, 0, 0),
          imagePath: "https://www.siammakro.co.th/images/foodservice.jpg",
          code: "0123456789012",
          redeemed: true,
          used: true
        }
      ]
    });
  }

  renderCouponItem = (item, key) => {
    const { language } = this.props.setting.params;
    const expireDate = moment(item.expireDate, "DD MMM YYYY");

    return (
      <View
        key={key}
        style={[styles.couponItem, expireDate < Date.now() ? styles.couponItem_expired : null]}
      >
        {item.imagePath ? (
          <View style={styles.couponItem__thumbnail}>
            <Image style={styles.couponItem__thumbnail_image} source={{ uri: item.imagePath }} />
          </View>
        ) : null}
        <View style={styles.couponItem__detail}>
          {!isEmpty(item.name.trim()) ? (
            <Text numberOfLines={1} style={styles.couponItem__detail_offertitle}>
              {language == "en" ? item.name : item.name_cambodia}
            </Text>
          ) : null}
          <Text numberOfLines={1} style={styles.couponItem__detail_offerdetail}>
            {language == "en" ? item.description : item.description_cambodia}
          </Text>
          <Text
            style={[
              styles.couponItem__detail_offerexpire,
              item.expired
                ? styles.couponItem__detail_offerexpired
                : styles.couponItem__detail_offernotexpire
            ]}
          >
            {expireDate < Date.now() ? (
              <FormattedMessage id="coupon.expired" />
            ) : (
              <Text>
                <FormattedMessage id="coupon.expire" /> {expireDate.format("DD/MM/YYYY")}
              </Text>
            )}
          </Text>
        </View>
        {!item.used && (
          <>
            <Image
              style={styles.couponItem__sep}
              source={require("../../assets/coupon_sep/coupon_sep.png")}
            />
            <TouchableOpacity
              style={styles.couponItem__submit}
              onPress={() => this.props.openCouponModal(item)}
            >
              <Text style={styles.couponItem__submit_text}>
                <FormattedMessage id="coupon.use" />
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  renderAvailableTab() {
    const { loading, redmpCoupon } = this.state;
    if (loading) {
      return (
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
      );
    }

    return (
      <ScrollView style={styles.couponList}>
        {redmpCoupon && redmpCoupon.map(this.renderCouponItem)}
      </ScrollView>
    );
  }

  renderHistoryTab() {
    const { loading, historyCoupon } = this.state;
    if (loading) {
      return (
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
      );
    }

    return (
      <ScrollView style={styles.couponList}>
        {historyCoupon && historyCoupon.map(this.renderCouponItem)}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>
          <Tabs
            tabBarUnderlineStyle={{ backgroundColor: "#FF0000" }}
            renderTabBar={() => (
              <ScrollableTab style={{ borderBottomWidth: 0, backgroundColor: "#f2f2f2" }} />
            )}
          >
            <Tab
              heading={
                <Text
                  style={{
                    backgroundColor: "transparent",
                    color: "#FF0000"
                  }}
                >
                  <FormattedMessage id="coupon.available" />
                </Text>
              }
              tabStyle={{ backgroundColor: "#f2f2f2" }}
              activeTabStyle={{ backgroundColor: "#f2f2f2" }}
              textStyle={{ color: "#000000" }}
              activeTextStyle={{ color: "#FF0000" }}
            >
              <View style={styles.container}>{this.renderAvailableTab()}</View>
            </Tab>
            <Tab
              heading={
                <Text
                  style={{
                    backgroundColor: "transparent",
                    color: "#FF0000"
                  }}
                >
                  <FormattedMessage id="coupon.history" />
                </Text>
              }
              tabStyle={{ backgroundColor: "#f2f2f2" }}
              activeTabStyle={{ backgroundColor: "#f2f2f2" }}
              textStyle={{ color: "#000000" }}
              activeTextStyle={{ color: "#FF0000" }}
            >
              <View style={styles.container}>{this.renderHistoryTab()}</View>
            </Tab>
          </Tabs>
        </Container>
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
    fontSize: 20,
    marginBottom: 5
  },
  couponItem__detail_offerdetail: {
    fontSize: 13,
    flex: 1,
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
  user: state.userReducer,
  setting: state.settingReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ openCouponModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedemptionCouponScreen);
