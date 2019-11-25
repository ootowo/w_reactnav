import React, { Component } from "react";
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HeaderTitle from "../../components/HeaderTitle";
import ProfileBar from "../../components/ProfileBar";
import { fetchRewardDetailData } from "../../apis/rewardApi";
import moment from "moment";
import { isEmpty } from "../../utils/validate";

class RewardProgramDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="reward" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      rewardData: {},
      data: {},
      loading: true
    };
  }

  componentDidMount() {
    const rewardData = this.props.navigation.getParam("reward_data");
    const memberCode = this.props.user.user.member_code;

    fetchRewardDetailData(memberCode, rewardData.memberRewardId)
      .then(res => {
        if (!isEmpty(res.data)) {
          this.setState({
            data: res.data
          });
        }
        this.setState({ loading: false, rewardData });
      })
      .catch(error => {
        this.setState({ loading: false, rewardData });
        console.log(error.message);
        Alert.alert("Makro", "Error while loading, please try again");
      });
  }

  renderCouponItem = (item, key) => {
    const { navigate } = this.props.navigation;
    const { data, rewardData } = this.state;
    const remainPurchase = item.termPoint - data.currentPoint;

    return (
      <View key={key} style={styles.couponItem}>
        <View style={styles.couponItem__detail}>
          <Text style={styles.couponItem__detail_name}>{item.description}</Text>
          <Text style={styles.couponItem__detail_expire}>
            Use coupon before{" "}
            {moment(data.validToDateTime, "YYYY-MM-DD HH:mm:ss").format("DD MMMM YYYY")}
          </Text>

          <Text style={styles.couponItem__detail_remain}>
            Remaining Purchase {remainPurchase > 0 ? remainPurchase : 0} Baht
          </Text>
        </View>
        <View style={styles.couponItem__action}>
          <TouchableOpacity
            style={[
              styles.couponItem__action_button,
              item.isUsed && styles.couponItem__action_button_disable
            ]}
            onPress={() => {
              Alert.alert(
                "Conform using redeem coupon 1 time / 1 coupon / 1 month",
                "Do you want to redeem this coupon 300 baht",
                [
                  { text: "Cancel", onPress: () => {}, style: "cancel" },
                  {
                    text: "OK",
                    onPress: () => {
                      navigate("RewardUseSuccess");
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.couponItem__action_button_text}>Redeem</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { width } = Dimensions.get("window");
    const thumbnailHeight = width / 2.3;
    const { data, rewardData, loading } = this.state;

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    let rewardName = data.memberRewardName;
    if (this.props.setting.params.language != "en") {
      rewardName = data.memberRewardNameCambodia;
    }

    return (
      <View style={styles.container}>
        <ProfileBar showSummary rewardData={data} />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.programItem} onPress={() => navigate("CouponProgramDetail")}>
            <View style={styles.programItem__thumbnail}>
              <Image
                source={{ uri: rewardData.filePath }}
                style={{ width: "100%", height: thumbnailHeight }}
              />
            </View>
            <View style={styles.programItem__title}>
              <Text style={styles.programItem__title_text}>{rewardName}</Text>
            </View>
          </View>

          <View style={styles.couponList}>
            {data.memberRewardTermList.map(this.renderCouponItem)}
          </View>

          <View style={styles.condition}>
            <Text style={styles.condition__title}>Campaign period</Text>
            <Text style={styles.condition__text}>
              {moment(data.validFromDate, "YYYY-MM-DD").format("DD MMMM YYYY")} -{" "}
              {moment(data.validToDate, "YYYY-MM-DD").format("DD MMMM YYYY")}
            </Text>
          </View>

          <View style={styles.condition}>
            <Text style={styles.condition__title}>Terms and Conditions</Text>
            <Text style={styles.condition__text}>
              Makro Jadhai Voucher{"\n"}
              1,100 Baht Voucher will appear when purchase up to 10,000 Baht and 400 Baht Voucher
              will appear when purchasing up to 20,000 Baht
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  programItem: { flexDirection: "column" },
  programItem__thumbnail: {},
  programItem__title: { padding: 10 },
  programItem__title_text: { fontSize: 14, fontWeight: "bold" },
  couponList: {
    padding: 10
  },
  couponItem: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 10,
    marginBottom: 5
  },
  couponItem__detail: { flex: 1 },
  couponItem__detail_name: { fontSize: 16, marginBottom: 5 },
  couponItem__detail_expire: { fontSize: 12, marginBottom: 10 },
  couponItem__detail_remain: { fontSize: 12, color: "#66b266" },
  couponItem__action: { flex: 0 },
  couponItem__action_button: {
    backgroundColor: "#66b266",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 3
  },
  couponItem__action_button_text: { fontWeight: "bold", color: "#FFFFFF" },
  couponItem__action_button_disable: {
    backgroundColor: "#B2B2B2"
  },
  condition: { padding: 10 },
  condition__title: { fontWeight: "bold" }
});

const mapStateToProps = state => ({
  user: state.userReducer,
  setting: state.settingReducer
});
export default connect(mapStateToProps)(RewardProgramDetailScreen);
