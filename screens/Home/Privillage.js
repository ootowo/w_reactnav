import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { openRewardModal } from "../../actions/modalAction";
import { fetchRewardData } from "../../apis/rewardApi";

class PrivillageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Member Rewards",
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
    this.setState({ loading: true });
    fetchRewardData(1)
      .then(res => {
        this.setState({ loading: false });
        if (!isEmpty(res.data)) {
          this.setState({
            availableReward: res.data.available,
            usedReward: res.data.used
          });
        } else {
          Alert.alert(
            "Makro",
            "These rewards are provided for our members only."
          );
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        Alert.alert("Error while loading", JSON.stringify(error));
      });
  }

  renderRewardItem = (item, key) => {
    return (
      <View
        key={key}
        style={[
          styles.rewardItem,
          item.expired ? styles.rewardItem_expired : null
        ]}
      >
        {item.image ? (
          <View style={styles.rewardItem__thumbnail}>
            <Image
              style={styles.rewardItem__thumbnail_image}
              source={item.image}
            />
          </View>
        ) : null}
        <View style={styles.rewardItem__detail}>
          {item.isPOS ? (
            <Text style={styles.rewardItem__detail_offertitle}>
              <Entypo name="star" size={14} color="#F5A623" /> {item.title}
            </Text>
          ) : (
            <Text style={styles.rewardItem__detail_offertitle}>
              {item.title}
            </Text>
          )}

          <Text
            style={[
              styles.rewardItem__detail_offerexpire,
              item.expired
                ? styles.rewardItem__detail_offerexpired
                : styles.rewardItem__detail_offernotexpire
            ]}
          >
            {item.expired ? "Expired" : item.expire}
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
          <Text style={styles.rewardItem__submit_text}>Use Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderUsedRewardItem = (item, key) => {
    return (
      <View
        key={key}
        style={[
          styles.rewardItem,
          item.expired ? styles.rewardItem_expired : null
        ]}
      >
        {item.image ? (
          <View style={styles.rewardItem__thumbnail}>
            <Image
              style={styles.rewardItem__thumbnail_image}
              source={item.image}
            />
          </View>
        ) : null}
        <View style={styles.rewardItem__detail}>
          {item.isPOS ? (
            <Text style={styles.rewardItem__detail_offertitle}>
              <Entypo name="star" size={14} color="#F5A623" /> {item.title}
            </Text>
          ) : (
            <Text style={styles.rewardItem__detail_offertitle}>
              {item.title}
            </Text>
          )}

          <Text
            style={[
              styles.rewardItem__detail_offerexpire,
              item.expired
                ? styles.rewardItem__detail_offerexpired
                : styles.rewardItem__detail_offernotexpire
            ]}
          >
            {item.expired ? "Expired" : item.expire}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const mockup = [
      {
        id: 0,
        title: "รับเครื่องดื่มฟรีเมื่อเข้าใช้บริการ Lounge",
        image: {
          uri:
            "https://www.aa.com/content/images/travel-info/clubs/lounges-flagship-lounge-filler.jpg"
        },
        isPOS: true,
        expire: "Expire 30 Sep 2018"
      },
      {
        id: 1,
        title: "รับกาแฟฟรี 1 แก้ว เมื่อซื้อสินค้าครบ 500 บาท",
        image: {
          uri:
            "https://www.pullmanbangkokkingpower.com/wp-content/uploads/sites/53/2016/10/Bangkok-City-Hotel-Executive-Lounge.jpg"
        },
        expire: "Expire 30 Sep 2018"
      }
    ];

    const mockup_used = [
      {
        id: 0,
        title: "รับเครื่องดื่มฟรีเมื่อเข้าใช้บริการ Lounge",
        image: {
          uri:
            "https://www.aa.com/content/images/travel-info/clubs/lounges-flagship-lounge-filler.jpg"
        },
        isPOS: true,
        expire: "Expire 30 Sep 2018"
      },
      {
        id: 1,
        title: "รับกาแฟฟรี 1 แก้ว เมื่อซื้อสินค้าครบ 500 บาท",
        image: {
          uri:
            "https://www.pullmanbangkokkingpower.com/wp-content/uploads/sites/53/2016/10/Bangkok-City-Hotel-Executive-Lounge.jpg"
        },
        expire: "Expire 30 Sep 2018",
        expired: true
      }
    ];
    const { loading } = this.state;

    return (
      <Container>
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
                <ScrollView style={styles.rewardList}>
                  {mockup.map(this.renderRewardItem)}
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
              <ScrollView style={styles.rewardList}>
                {mockup_used.map(this.renderUsedRewardItem)}
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
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ openRewardModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivillageScreen);
