import React, { Component } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import HeaderTitle from "../../components/HeaderTitle";
import { isEmpty } from "../../utils/validate";

import { openRewardModal } from "../../actions/modalAction";
import { fetchRewardData } from "../../apis/rewardApi";
import { setCountingReward } from "../../actions/countingAction";

class PrivillageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="reward" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      availableReward: [],
      usedReward: []
    };
  }

  componentDidMount() {
    this.props.setCountingReward({
      ...this.props.counting.internal,
      reward: this.props.counting.external.reward
    });

    this.setState({ loading: true });
    fetchRewardData(this.props.user.user.member_code)
      .then(res => {
        if (!isEmpty(res.data)) {
          this.setState({
            availableReward: isEmpty(res.data.available) ? [] : res.data.available,
            usedReward: isEmpty(res.data.used) ? [] : res.data.used
          });
        } else {
          // if (this.props.setting.params.language == "en") {
          //   Alert.alert("Makro", "These rewards are provided for our members only.");
          // } else {
          //   Alert.alert("Makro", "ផ្តល់ជូនសំរាប់សមាជិកតែប៉ុណ្ណោះ");
          // }
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error.message);
        Alert.alert("Makro", "Error while loading, please try again");
      });
  }

  renderRewardItem = (item, key) => {
    const { language } = this.props.setting.params;
    const expireDate = moment(item.expireDate, "DD MMM YYYY");
    return (
      <View
        key={key}
        style={[styles.rewardItem, expireDate < Date.now() ? styles.rewardItem_expired : null]}
      >
        {item.imagePath ? (
          <View style={styles.rewardItem__thumbnail}>
            <Image style={styles.rewardItem__thumbnail_image} source={{ uri: item.imagePath }} />
          </View>
        ) : null}
        <View style={styles.rewardItem__detail}>
          {/* <Text style={styles.rewardItem__detail_offertitle}>
              <Entypo name="star" size={14} color="#F5A623" /> {item.name}
            </Text> */}
          <Text numberOfLines={1} style={styles.rewardItem__detail_offertitle}>
            {language == "en" ? item.name : item.name_cambodia}
          </Text>

          <Text
            style={[
              styles.rewardItem__detail_offerexpire,
              expireDate < Date.now()
                ? styles.rewardItem__detail_offerexpired
                : styles.rewardItem__detail_offernotexpire
            ]}
          >
            {expireDate < Date.now() ? (
              <FormattedMessage id="reward.expired" />
            ) : (
              <Text>
                <FormattedMessage id="reward.expire" /> {expireDate.format("DD/MM/YYYY")}
              </Text>
            )}
          </Text>
        </View>
        <Image
          style={styles.couponItem__sep}
          source={require("../../assets/coupon_sep/coupon_sep.png")}
        />
        <TouchableOpacity
          style={styles.rewardItem__submit}
          onPress={() => this.props.openRewardModal(item)}
        >
          <Text style={styles.rewardItem__submit_text}>
            <FormattedMessage id="reward.use" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderUsedRewardItem = (item, key) => {
    const { language } = this.props.setting.params;
    // const expireDate = moment(item.usedDate.date, "YYYY-MM-DD HH:mm:ss.S");
    const usedDate = item.usedDate ? moment(item.usedDate.date, "YYYY-MM-DD HH:mm:ss.S") : null;
    return (
      <View key={key} style={[styles.rewardItem, !usedDate ? styles.rewardItem_expired : null]}>
        {item.imagePath ? (
          <View style={styles.rewardItem__thumbnail}>
            <Image style={styles.rewardItem__thumbnail_image} source={{ uri: item.imagePath }} />
          </View>
        ) : null}
        <View style={styles.rewardItem__detail}>
          {/* <Text style={styles.rewardItem__detail_offertitle}>
              <Entypo name="star" size={14} color="#F5A623" /> {item.name}
            </Text> */}
          <Text numberOfLines={1} style={styles.rewardItem__detail_offertitle}>
            {language == "en" ? item.name : item.name_cambodia}
          </Text>

          {/* <Text
            style={[
              styles.rewardItem__detail_offerexpire,
              expireDate < Date.now()
                ? styles.rewardItem__detail_offerexpired
                : styles.rewardItem__detail_offernotexpire
            ]}
          >
            {expireDate < Date.now() ? (
              <FormattedMessage id="reward.expired" />
            ) : (
              <Text>
                <FormattedMessage id="reward.expire" /> {expireDate.format("D MMMM YYYY")}
              </Text>
            )}
          </Text> */}
          {usedDate ? (
            <Text style={styles.rewardItem__detail_offeruseat}>
              <FormattedMessage id="reward.used.at" /> {usedDate.format("DD/MM/YYYY HH:mm:ss")}
            </Text>
          ) : (
            <Text
              style={[
                styles.rewardItem__detail_offerexpire,
                styles.rewardItem__detail_offerexpired
              ]}
            >
              <FormattedMessage id="reward.expired" />
            </Text>
          )}
        </View>
        <Image
          style={styles.couponItem__sep}
          source={require("../../assets/coupon_sep/coupon_sep.png")}
        />
        <TouchableOpacity
          style={styles.rewardItem__submit}
          onPress={() => this.props.openRewardModal(item)}
        >
          <Text style={styles.rewardItem__submit_text}>View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { availableReward, usedReward, loading } = this.state;

    return (
      <Container>
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
                <FormattedMessage id="reward.available" />
              </Text>
            }
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
                <ScrollView style={styles.rewardList}>
                  {availableReward && availableReward.map(this.renderRewardItem)}
                </ScrollView>
              )}
            </View>
          </Tab>
          <Tab
            heading={
              <Text
                style={{
                  backgroundColor: "transparent",
                  color: "#FF0000"
                }}
              >
                <FormattedMessage id="reward.history" />
              </Text>
            }
            tabStyle={{ backgroundColor: "#f2f2f2" }}
            activeTabStyle={{ backgroundColor: "#f2f2f2" }}
            textStyle={{ color: "#FF0000" }}
            activeTextStyle={{ color: "#FF0000" }}
          >
            <View style={styles.container}>
              <ScrollView style={styles.rewardList}>
                {usedReward && usedReward.map(this.renderUsedRewardItem)}
              </ScrollView>
            </View>
          </Tab>
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
  rewardList: {
    padding: 10
  },
  // rewardItem: {
  //   width: "100%",
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 5,
  //   shadowOffset: { width: 0, height: 5 },
  //   shadowColor: "#000000",
  //   shadowOpacity: 0.1,
  //   marginBottom: 20
  // },
  // rewardItem__thumbnail: {
  //   width: "100%",
  //   height: 100,
  //   backgroundColor: "#dfdfdf",
  //   borderTopLeftRadius: 5,
  //   borderTopRightRadius: 5,
  //   overflow: "hidden"
  // },
  // rewardItem__thumbnail_image: {
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "cover"
  // },
  // rewardItem__detail: {
  //   padding: 15
  // },
  // rewardItem__detail_text: {
  //   fontWeight: "bold",
  //   color: "#635F62"
  // },
  rewardItem: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    marginBottom: 15,
    flexDirection: "row"
  },
  rewardItem_expired: {
    opacity: 0.65
  },
  rewardItem__thumbnail: {
    flex: 0,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  rewardItem__thumbnail_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  rewardItem__detail: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  rewardItem__detail_offertitle: {
    color: "#000000",
    fontSize: 15,
    flex: 1,
    marginBottom: 5
  },
  rewardItem__detail_offerdetail: {
    fontSize: 13,
    color: "#635F62"
  },
  rewardItem__detail_offerexpire: {
    fontSize: 10
  },
  rewardItem__detail_offernotexpire: {
    color: "#B1AFB0"
  },
  rewardItem__detail_offerexpired: {
    color: "#FF0000"
  },
  rewardItem__detail_offeruseat: {
    fontSize: 10,
    marginTop: 5
  },
  rewardItem__sep: {
    width: 14,
    height: 100,
    resizeMode: "contain"
  },
  rewardItem__submit: {
    flex: 0,
    width: 80,
    height: 100,
    backgroundColor: "#FF7D7D",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4
  },
  rewardItem__submit_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});
const mapStateToProps = state => ({
  modal: state.modalReducer,
  user: state.userReducer,
  setting: state.settingReducer,
  counting: state.countingReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ openRewardModal, setCountingReward }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivillageScreen);
