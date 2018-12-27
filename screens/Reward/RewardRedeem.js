import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { List, ListItem } from "react-native-elements";
import { Container, Tab, Tabs, ScrollableTab } from "native-base";
import HeaderTitle from "../../components/HeaderTitle";
import { openRewardModal } from "../../actions/modalAction";

class RewardRedeemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="reward" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      availableData: [
        {
          name: "Makro Jad Hai every month buy more get more",
          use_date: "Redeem on 14 March 2561 11:59:32",
          thumbnail: require("../../assets/banner.jpg")
        }
      ],
      historyData: [
        {
          name:
            "Frech Food : Special!! Promotion collect more get more Fresh Cashback hurry collect from now",
          use_date: "Redeem on 13 March 2561 12:05:18",
          thumbnail: require("../../assets/banner.jpg")
        }
      ],
      mockReward: {
        name:
          "Frech Food : Special!! Promotion collect more get more Fresh Cashback hurry collect from now",
        name_cambodia:
          "Frech Food : Special!! Promotion collect more get more Fresh Cashback hurry collect from now",
        code: "0123456789012",
        imagePath: require("../../assets/banner.jpg")
      }
    };

    this.renderAvailableTab = this.renderAvailableTab.bind(this);
    this.renderHistoryTab = this.renderHistoryTab.bind(this);
  }

  renderAvailableTab() {
    const { availableData } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <List
        containerStyle={{
          marginTop: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0
        }}
      >
        <FlatList
          data={availableData}
          renderItem={({ item }) => (
            <ListItem
              avatarStyle={{ width: 80, height: 80 }}
              avatarContainerStyle={{ width: 80, height: 80 }}
              title={item.name}
              titleNumberOfLines={2}
              subtitle={item.use_date}
              avatar={item.thumbnail}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.props.openRewardModal(this.state.mockReward)}
            />
          )}
        />
      </List>
    );
  }

  renderHistoryTab() {
    const { historyData } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <List
        containerStyle={{
          marginTop: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0
        }}
      >
        <FlatList
          data={historyData}
          renderItem={({ item }) => (
            <ListItem
              avatarStyle={{ width: 80, height: 80 }}
              avatarContainerStyle={{ width: 80, height: 80 }}
              title={item.name}
              titleNumberOfLines={2}
              subtitle={item.use_date}
              avatar={item.thumbnail}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.props.openRewardModal(this.state.mockReward)}
            />
          )}
        />
      </List>
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
              heading={"Available"}
              tabStyle={{ backgroundColor: "#f2f2f2" }}
              activeTabStyle={{ backgroundColor: "#f2f2f2" }}
              textStyle={{ color: "#000000" }}
              activeTextStyle={{ color: "#FF0000" }}
            >
              <View style={styles.container}>{this.renderAvailableTab()}</View>
            </Tab>
            <Tab
              heading={"History"}
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
    flex: 0,
    backgroundColor: "#FF0000"
  }
});

const mapStateToProps = state => ({
  user: state.userReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ openRewardModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardRedeemScreen);
