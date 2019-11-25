import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import { Dimensions } from "react-native";
import React, { Component } from "react";

import CardHeader from "../../components/CardHeader";
import CatelogScreen from "./Catelog";
import FavoriteScreen from "./Favorite";
import ProfileHeader from "../../components/ProfileHeader";

class MainProductScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ProfileHeader navigation={navigation} />,
    headerRight: <CardHeader />,
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  render() {
    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab style={{ borderBottomWidth: 0 }} />}>
          <Tab heading="Professional Products">
            <CatelogScreen navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Favorites">
            <FavoriteScreen navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default MainProductScreen;
