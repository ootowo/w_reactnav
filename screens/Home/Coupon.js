import React, { Component } from "react";

import {
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Banner } from "../../components/Banner";
import HeaderTitle from "../../components/HeaderTitle";
import { isEmpty } from "../../utils/validate";
import { _HOST } from "../../utils/config";

import { openCouponModal, openCouponRedeemModal } from "../../actions/modalAction";
import { setCountingCoupon } from "../../actions/countingAction";
import { fetchCouponData, setRedeemCoupon } from "../../apis/couponApi";

class CouponScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="coupon" />,
    headerTintColor: "#000000",
    headerBackTitle: null,
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginRight: 5, height: "100%", paddingHorizontal: 10 }}
          onPress={() => navigation.navigate("RedemptionCoupon")}
        >
          <MaterialCommunityIcons
            name="ticket-confirmation"
            style={{ color: "#000000", fontSize: 25 }}
          />
        </TouchableOpacity>
      </View>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      usedCoupon: [],
      availableCoupon: []
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.dataLoader = this.dataLoader.bind(this);
    this.filteredNonRedeemedData = this.filteredNonRedeemedData.bind(this);
  }

  componentDidMount() {
    this.props.setCountingCoupon({
      ...this.props.counting.internal,
      coupon: this.props.counting.external.coupon
    });

    // Fetch Data
    this.dataLoader();
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.dataLoader();
      }
    );
  }

  dataLoader() {
    // this.setState({ loading: true, refreshing: true });
    fetchCouponData(this.props.user.user.member_code)
      .then(res => {
        if (!isEmpty(res.data)) {
          this.setState({
            availableCoupon: isEmpty(res.data.available)
              ? []
              : this.filteredNonRedeemedData(res.data.available),
            usedCoupon: isEmpty(res.data.used) ? [] : res.data.used
          });
        } else {
          // if (this.props.setting.params.language == "en") {
          //   Alert.alert("Makro", "These coupons are provided for members only.");
          // } else {
          //   Alert.alert("Makro", "ផ្តល់ជូនសំរាប់សមាជិកតែប៉ុណ្ណោះ");
          // }
        }
        this.setState({ loading: false, refreshing: false });
      })
      .catch(error => {
        this.setState({ loading: false, refreshing: false });
        console.log(error.message);
        Alert.alert("Makro", "Error while loading, please try again");
      });
  }

  filteredNonRedeemedData = data => {
    return data.filter(item => item.isRedeemed === "0");
  };

  renderCouponItem = ({ item, index }) => {
    const { language } = this.props.setting.params;
    const expireDate = moment(item.expireDate, "DD MMM YYYY");
    return (
      <View
        key={index}
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
        <Image
          style={styles.couponItem__sep}
          source={require("../../assets/coupon_sep/coupon_sep.png")}
        />
        {item.isRedeemed !== "0" ? (
          <TouchableOpacity
            style={styles.couponItem__submit}
            onPress={() => this.props.openCouponModal(item)}
          >
            <Text style={styles.couponItem__submit_text}>
              <FormattedMessage id="coupon.use" />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.couponItem__submit}
            onPress={() => this.props.openCouponRedeemModal(item)}
          >
            <Text style={styles.couponItem__submit_text}>
              Redeem
              {/* <FormattedMessage id="coupon.use" /> */}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderUsedCoupon = (item, key) => {
    const { language } = this.props.setting.params;
    // const expireDate = moment(item.usedDate.date, "YYYY-MM-DD HH:mm:ss.S");
    const usedDate = item.usedDate ? moment(item.usedDate.date, "YYYY-MM-DD HH:mm:ss.S") : null;
    return (
      <View key={key} style={[styles.couponItem, !usedDate ? styles.couponItem_expired : null]}>
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
            {language == "en" ? item.detail : item.detail_cambodia}
          </Text>
          {/* <Text
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
              <FormattedMessage id="coupon.expire" /> + expireDate.format("D MMMM YYYY")
            )}
          </Text> */}
          {usedDate ? (
            <Text style={styles.couponItem__detail_offeruseat}>
              <FormattedMessage id="coupon.used.at" /> {usedDate.format("DD/MM/YYYY HH:mm:ss")}
            </Text>
          ) : (
            <Text
              style={[
                styles.couponItem__detail_offerexpire,
                styles.couponItem__detail_offerexpired
              ]}
            >
              <FormattedMessage id="coupon.expired" />
            </Text>
          )}
        </View>
        <Image
          style={styles.couponItem__sep}
          source={require("../../assets/coupon_sep/coupon_sep.png")}
        />
        <TouchableOpacity
          style={styles.couponItem__submit}
          onPress={() => this.props.openCouponModal(item)}
        >
          <Text style={styles.couponItem__submit_text}>View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { availableCoupon, usedCoupon, loading, refreshing } = this.state;
    const { coupon } = this.props.banner;
    const couponBannerImages = coupon.map(banner => {
      return {
        uri: _HOST + banner.file_path
      };
    });
    const couponBannerURLs = coupon.map(banner => {
      return banner.file_url;
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            style={{ margin: 10, flex: 1 }}
            data={availableCoupon}
            keyExtractor={item => item.code}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            renderItem={this.renderCouponItem}
          />
        </View>
        <Banner darkmode mini images={couponBannerImages} urls={couponBannerURLs} />
      </View>
    );

    // return (
    //   <View style={{ flex: 1 }}>
    //     <Container style={{ flex: 1 }}>
    //       <Tabs
    //         tabBarUnderlineStyle={{ backgroundColor: "#FF0000" }}
    //         renderTabBar={() => (
    //           <ScrollableTab style={{ borderBottomWidth: 0, backgroundColor: "#f2f2f2" }} />
    //         )}
    //       >
    //         <Tab
    //           heading={
    //             <Text
    //               style={{
    //                 backgroundColor: "transparent",
    //                 color: "#FF0000"
    //               }}
    //             >
    //               <FormattedMessage id="coupon.available" />
    //             </Text>
    //           }
    //           tabStyle={{ backgroundColor: "#f2f2f2" }}
    //           activeTabStyle={{ backgroundColor: "#f2f2f2" }}
    //           textStyle={{ color: "#000000" }}
    //           activeTextStyle={{ color: "#FF0000" }}
    //         >
    //           <View style={styles.container}>
    //             {loading ? (
    //               <View
    //                 style={{
    //                   flex: 1,
    //                   position: "absolute",
    //                   top: 0,
    //                   left: 0,
    //                   backgroundColor: "#FFFFFF",
    //                   width: "100%",
    //                   height: "100%",
    //                   alignItems: "center",
    //                   justifyContent: "center"
    //                 }}
    //               >
    //                 <ActivityIndicator size="large" />
    //               </View>
    //             ) : (
    //               <ScrollView style={styles.couponList}>
    //                 {availableCoupon && availableCoupon.map(this.renderCouponItem)}
    //               </ScrollView>
    //             )}
    //           </View>
    //         </Tab>
    //         <Tab
    //           heading={
    //             <Text
    //               style={{
    //                 backgroundColor: "transparent",
    //                 color: "#FF0000"
    //               }}
    //             >
    //               <FormattedMessage id="coupon.history" />
    //             </Text>
    //           }
    //           tabStyle={{ backgroundColor: "#f2f2f2" }}
    //           activeTabStyle={{ backgroundColor: "#f2f2f2" }}
    //           textStyle={{ color: "#000000" }}
    //           activeTextStyle={{ color: "#FF0000" }}
    //         >
    //           <View style={styles.container}>
    //             <ScrollView style={styles.couponList}>
    //               {usedCoupon && usedCoupon.map(this.renderUsedCoupon)}
    //             </ScrollView>
    //           </View>
    //         </Tab>
    //       </Tabs>
    //     </Container>
    //     <Banner darkmode mini images={couponBannerImages} urls={couponBannerURLs} />
    //   </View>
    // );
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
  model: state.modalReducer,
  banner: state.bannerReducer,
  user: state.userReducer,
  setting: state.settingReducer,
  counting: state.countingReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ openCouponModal, openCouponRedeemModal, setCountingCoupon }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponScreen);
