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

class RewardProgramDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="reward" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Coupon 100 Baht",
          expire: "Use coupon before 19 March 2561",
          remain: "Remaining purchase 0 Baht",
          used: false
        },
        {
          name: "Coupon 400 Baht",
          expire: "Use coupon before 19 March 2561",
          remain: "Remaining purchase 0 Baht",
          used: true
        }
      ]
    };
  }

  renderCouponItem = (item, key) => {
    const { navigate } = this.props.navigation;
    return (
      <View key={key} style={styles.couponItem}>
        <View style={styles.couponItem__detail}>
          <Text style={styles.couponItem__detail_name}>{item.name}</Text>
          <Text style={styles.couponItem__detail_expire}>{item.expire}</Text>
          <Text style={styles.couponItem__detail_remain}>{item.remain}</Text>
        </View>
        <View style={styles.couponItem__action}>
          <TouchableOpacity
            style={[
              styles.couponItem__action_button,
              item.used && styles.couponItem__action_button_disable
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
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <ProfileBar showSummary />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.programItem} onPress={() => navigate("CouponProgramDetail")}>
            <View style={styles.programItem__thumbnail}>
              <Image
                source={require("../../assets/banner.jpg")}
                style={{ width: "100%", height: thumbnailHeight }}
              />
            </View>
            <View style={styles.programItem__title}>
              <Text style={styles.programItem__title_text}>
                Accumulate purchase of participating items Makro Jadhai May
              </Text>
            </View>
          </View>

          <View style={styles.couponList}>{data.map(this.renderCouponItem)}</View>

          <View style={styles.condition}>
            <Text style={styles.condition__title}>Campaign period</Text>
            <Text style={styles.condition__text}>12 March 2561 - 19 March 2561</Text>
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

export default RewardProgramDetailScreen;
