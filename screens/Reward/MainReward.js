import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HeaderTitle from "../../components/HeaderTitle";
import ProfileBar from "../../components/ProfileBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isEmpty } from "../../utils/validate";

import { fetchRewardData } from "../../apis/rewardApi";

class MainRewardScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="reward" />,
    headerTintColor: "#000000",
    headerBackTitle: null
    // headerRight: (
    //   <View style={{ flexDirection: "row" }}>
    //     <TouchableOpacity
    //       style={{ marginRight: 5, height: "100%", paddingHorizontal: 10 }}
    //       onPress={() => navigation.navigate("RewardRedeem")}
    //     >
    //       <MaterialCommunityIcons
    //         name="ticket-percent"
    //         style={{ color: "#000000", fontSize: 28 }}
    //       />
    //     </TouchableOpacity>
    //   </View>
    // )
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      data: []
    };

    this.renderCouponItem = this.renderCouponItem.bind(this);
    this.dataLoader = this.dataLoader.bind(this);
  }

  componentDidMount() {
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
    fetchRewardData(this.props.user.user.member_code)
      .then(res => {
        if (!isEmpty(res.data)) {
          this.setState({
            data: res.data
          });
        }
        this.setState({ loading: false, refreshing: false });
      })
      .catch(error => {
        this.setState({ loading: false, refreshing: false });
        console.log(error.message);
        Alert.alert("Makro", "Error while loading, please try again");
      });
  }

  renderCouponItem = ({ item, index }) => {
    const { width } = Dimensions.get("window");
    const thumbnailHeight = width / 2.3;
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        key={index}
        style={styles.programItem}
        onPress={() => navigate("RewardProgramDetail", { reward_data: item })}
      >
        <View style={styles.programItem__thumbnail}>
          <Image
            source={{ uri: item.filePath }}
            style={{ width: "100%", height: thumbnailHeight }}
          />
        </View>
        <View style={styles.programItem__title}>
          <Text style={styles.programItem__title_text}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        {/* <ProfileBar /> */}
        <FlatList style={styles.programList} data={data} renderItem={this.renderCouponItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8"
  },
  programList: {
    flex: 1
  },
  programItem: { flexDirection: "column", backgroundColor: "#FFFFFF", flex: 1, marginBottom: 10 },
  programItem__thumbnail: {},
  programItem__title: { padding: 10 },
  programItem__title_text: { fontSize: 14, fontWeight: "bold" }
});
const mapStateToProps = state => ({
  user: state.userReducer
});
export default connect(mapStateToProps)(MainRewardScreen);
