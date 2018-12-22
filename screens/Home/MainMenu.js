import { connect } from "react-redux";
import React, { Component } from "react";

import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { Text } from "native-base";
import { WebBrowser } from "expo";
import { bindActionCreators } from "redux";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome
} from "@expo/vector-icons";
import { FormattedMessage } from "react-intl";

import {
  openSocialModal,
  openSelectBranchModal,
  openAuthenModal,
  openRewardEarnedModal
} from "../../actions/modalAction";
import { setCountingInternal, setCountingExternal } from "../../actions/countingAction";
import { makeConfigAsync } from "../../actions/settingAction";
import { authenClear, syncAuthen } from "../../actions/userAction";
import { _HOST } from "../../utils/config";

import ProfileHeader from "../../components/ProfileHeader";
import CardHeader from "../../components/CardHeader";
import { Banner } from "../../components/Banner";
import { isEmpty } from "../../utils/validate";
import { removeUserFromDB } from "../../apis/authenApi";
import { fetchAllDataLength, fetchCountingFromDB } from "../../apis/countingApi";

class MainMenuScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ProfileHeader navigation={navigation} />,
    headerRight: <CardHeader />
  });

  constructor(props) {
    super(props);
    this.onPressOpenWebSite = this.onPressOpenWebSite.bind(this);
    this.reCalculateCounter = this.reCalculateCounter.bind(this);
    this.navigateGrantCheck = this.navigateGrantCheck.bind(this);
    this.clearBranchSelected = this.clearBranchSelected.bind(this);
  }

  async onPressOpenWebSite(address) {
    await WebBrowser.openBrowserAsync(address);
  }

  componentDidMount() {
    setTimeout(() => {
      new Promise((resolve, reject) => {
        this.props.syncAuthen(resolve, reject);
      }).then(res => {
        if (isEmpty(res)) {
          this.props.navigation.navigate("Authen");
        }
      });
    }, 1000);

    this.reCalculateCounter();
    const isFacebook = this.props.user.user.facebook_access_token !== null;
    if (this.props.setting.params.branch == null && !isEmpty(this.props.user.user) && !isFacebook) {
      this.props.openSelectBranchModal();
    }

    // this.props.openRewardEarnedModal();
  }

  reCalculateCounter() {
    // Fetch Old Counter from DB
    fetchCountingFromDB().then(res => {
      this.props.setCountingInternal(res);
      // Fetch Latest Counter from API
      fetchAllDataLength(this.props.user.user.member_code, res => {
        this.props.setCountingExternal(res);
      });
    });
  }

  navigateGrantCheck(facebookCheck, page) {
    const isFacebook = this.props.user.user.facebook_access_token !== null;
    const { language } = this.props.setting.params;

    if (facebookCheck && !isFacebook) {
      this.props.navigation.navigate(page);
    } else if (!facebookCheck) {
      this.props.navigation.navigate(page);
    } else {
      var title = "Makro";
      var message =
        "These rewards are provided for members only. Please log in your Makro member ID.";
      if (language == "ka") {
        title = "ម៉ាក្រូ";
        message = "ផ្តល់ជូនសំរាប់សមាជិកតែប៉ុណ្ណោះ សូមបញ្ចូលលេខកូដសមាជិករបស់អ្នក";
      }

      Alert.alert(
        title,
        message,
        [
          // { text: "Cancel", onPress: () => {}, style: "cancel" },
          {
            text: "OK",
            onPress: () => {
              // removeUserFromDB().then(res => {
              //   this.clearBranchSelected(() => {
              //     this.props.authenClear();
              //     this.props.navigation.navigate("Authen");
              //   });
              // });
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  clearBranchSelected(cb) {
    new Promise((resolve, reject) => {
      this.props.makeConfigAsync(
        {
          key: "branch",
          value: null,
          oldSetting: this.props.setting.params
        },
        resolve,
        reject
      );
    }).then(() => {
      cb();
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { home } = this.props.banner;

    const counter = {
      internal: this.props.counting.internal,
      external: this.props.counting.external
    };
    const homeBannerImages = home.map(banner => {
      return {
        uri: _HOST + banner.file_path
      };
    });
    const homeBannerURLs = home.map(banner => {
      return banner.file_url;
    });

    const unread = {
      coupon: counter.external.coupon - counter.internal.coupon,
      mail: counter.external.mail - counter.internal.mail,
      catalog: counter.external.catalog - counter.internal.catalog,
      offer: counter.external.offer - counter.internal.offer,
      reward: counter.external.reward - counter.internal.reward
    };

    return (
      <View style={styles.container}>
        <Image style={styles.redBg} source={require("../../assets/home_bg.png")} />

        <ScrollView style={styles.wrapper}>
          <Banner images={homeBannerImages} urls={homeBannerURLs} />
          <View style={styles.menuGrid}>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(true, "Coupon")}
              >
                <View>
                  {unread.coupon > 0 && (
                    <View style={styles.menuButton__badge}>
                      <Text style={styles.menuButton__badge_text}>{unread.coupon}</Text>
                    </View>
                  )}
                  <View style={styles.menuButton__icon}>
                    <Ionicons name="md-barcode" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.coupon" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(false, "Mail")}
              >
                <View>
                  {unread.mail > 0 && (
                    <View style={styles.menuButton__badge}>
                      <Text style={styles.menuButton__badge_text}>{unread.mail}</Text>
                    </View>
                  )}
                  <View style={styles.menuButton__icon}>
                    <SimpleLineIcons name="notebook" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.mail" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(false, "ProductCatalog")}
              >
                <View>
                  {unread.catalog > 0 && (
                    <View style={styles.menuButton__badge}>
                      <Text style={styles.menuButton__badge_text}>
                        <FormattedMessage id="new" />
                      </Text>
                    </View>
                  )}
                  <View style={styles.menuButton__icon}>
                    <SimpleLineIcons name="book-open" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.catelog" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(true, "MainReward")}
              >
                <View>
                  {unread.reward > 0 && (
                    <View style={styles.menuButton__badge}>
                      <Text style={styles.menuButton__badge_text}>{unread.reward}</Text>
                    </View>
                  )}
                  <View style={styles.menuButton__icon}>
                    <MaterialCommunityIcons name="gift" color="#FF0000" size={38} />
                  </View>
                </View>

                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.reward" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(false, "News")}
              >
                <View>
                  <View style={styles.menuButton__icon}>
                    <Entypo name="megaphone" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.news" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(false, "Entertainment")}
              >
                <View>
                  <View style={styles.menuButton__icon}>
                    <Entypo name="clapperboard" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.entertain" />
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={this.props.openSocialModal}
              >
                <View style={styles.menuButton__icon}>
                  <SimpleLineIcons name="globe" color="#FF0000" size={38} />
                </View>
                <Text style={styles.menuButton__text}>Social Networks</Text>
              </TouchableOpacity>
            </View> */}
            {/* <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={this.onPressOpenWebSite}
              >
                <View style={styles.menuButton__icon}>
                  <SimpleLineIcons name="mouse" color="#FF0000" size={38} />
                </View>
                <Text style={styles.menuButton__text}>Makro Click!</Text>
              </TouchableOpacity>
            </View> */}

            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(false, "Offer")}
              >
                <View>
                  {unread.offer > 0 && (
                    <View style={styles.menuButton__badge}>
                      <Text style={styles.menuButton__badge_text}>{unread.offer}</Text>
                    </View>
                  )}
                  <View style={styles.menuButton__icon}>
                    <FontAwesome name="bell-o" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.offer" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => this.navigateGrantCheck(false, "Setting")}
              >
                <View>
                  <View style={styles.menuButton__icon}>
                    <FontAwesome name="cog" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>
                  <FormattedMessage id="home.menu.setting" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF0000",
    width: "100%",
    height: "100%"
  },
  redBg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  wrapper: {
    width: "100%"
  },
  menuGrid: {
    flex: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10
  },
  menuGridCell: {
    width: "33.33%",
    padding: 10
  },
  menuButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  menuButton__badge: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    backgroundColor: "#4c4cff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99
  },
  menuButton__badge_text: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold"
  },
  menuButton__icon: {
    width: 76,
    height: 76,
    paddingTop: 2,
    paddingLeft: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 38,
    backgroundColor: "#FFFFFF"
  },
  menuButton__text: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 5
  }
});

const mapStateToProps = state => ({
  modal: state.modalReducer,
  banner: state.bannerReducer,
  user: state.userReducer,
  setting: state.settingReducer,
  counting: state.countingReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openSocialModal,
      openSelectBranchModal,
      openAuthenModal,
      openRewardEarnedModal,
      setCountingInternal,
      setCountingExternal,
      makeConfigAsync,
      authenClear,
      syncAuthen
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuScreen);
