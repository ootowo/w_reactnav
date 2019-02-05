import { View, Text, Image, StatusBar, StyleSheet, Linking, Alert } from "react-native";
import React, { Component } from "react";

import { Root, Container, Content, List, ListItem, Body, Left } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";

import { isEmpty } from "../../utils/validate";
import { authenClear } from "../../actions/userAction";
import { makeConfigAsync } from "../../actions/settingAction";
import { removeUserFromDB } from "../../apis/authenApi";

class MainProfileScreen extends Component {
  static navigationOptions = ({ natigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.clearBranchSelected = this.clearBranchSelected.bind(this);
  }

  handleLogout() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      this.clearBranchSelected(() => {
        removeUserFromDB()
          .then(() => {
            this.props.authenClear();
            this.setState({ loading: false });
            this.props.navigation.navigate("Authen");
          })
          .catch(() => {
            this.props.authenClear();
            this.setState({ loading: false });
            this.props.navigation.navigate("Authen");
          });
      });
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

  renderProfile() {
    const { user } = this.props.user;
    return (
      <View style={styles.profileHeader}>
        <View
          style={{
            flex: 0,
            width: "100%",
            flexDirection: "row",
            zIndex: 99,
            position: "absolute",
            bottom: 10,
            left: 10
          }}
        >
          <View style={styles.profileImage}>
            <Image
              style={styles.profileImage__photo}
              source={{
                uri: user.picture_path
                  ? Base64.decode(user.picture_path)
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBapT6eBUt5RFRTxWPwztndojMWqgwoLLxD1lCwhUJ834nLXSk"
              }}
            />
          </View>
          <View style={styles.profileName}>
            <Text style={styles.profileName__text}>
              {!isEmpty(user.first_name) && user.first_name}{" "}
              {!isEmpty(user.last_name) && user.last_name}
            </Text>
            <Text style={styles.profileName__number}>{user.member_code}</Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
          <Image
            resizeMode="cover"
            source={require("../../assets/home_bg.png")}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>
      </View>
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        {this.renderProfile()}
        <View style={styles.profileMenu}>
          <Container>
            <Content>
              <List>
                {/* <ListItem icon>
                    <Left>
                      <Ionicons name="ios-heart" size={20} color="#635F62" />
                    </Left>
                    <Body>
                      <Text>Favorite Products</Text>
                    </Body>
                  </ListItem>
                  <ListItem itemDivider /> */}
                <ListItem
                  icon
                  onPress={() => {
                    Linking.openURL("https://www.facebook.com/makrocambodia/");
                  }}
                >
                  <Left>
                    <FontAwesome name="facebook-official" size={20} color="#3b5998" />
                  </Left>
                  <Body>
                    <Text>
                      <FormattedMessage id="profile.facebook" />
                    </Text>
                  </Body>
                </ListItem>
                {/* <ListItem icon onPress={() => navigate("MyOrder")}>
                  <Left>
                    <FontAwesome name="shopping-bag" size={20} color="#808080" />
                  </Left>
                  <Body>
                    <Text>My Order</Text>
                  </Body>
                </ListItem> */}
                <ListItem icon onPress={this.handleLogout}>
                  <Left>
                    <FontAwesome name="sign-out" size={20} color="#FF0000" />
                  </Left>
                  <Body>
                    <Text>
                      {loading ? (
                        <FormattedMessage id="loading" />
                      ) : (
                        <FormattedMessage id="profile.logout" />
                      )}
                    </Text>
                  </Body>
                </ListItem>
                <ListItem itemDivider>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "#635F62"
                    }}
                  >
                    <FormattedMessage id="profile.version" /> 3.4 (2018)
                  </Text>
                </ListItem>
              </List>
            </Content>
          </Container>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  profileHeader: {
    flex: 0,
    alignItems: "flex-end",
    width: "100%",
    height: 150
  },
  profileImage: {
    flex: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    overflow: "hidden"
  },
  profileImage__photo: {
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  profileName: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    marginLeft: 15
  },
  profileName__text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  profileName__number: {
    color: "#FFFFFF",
    marginTop: 5
  },
  profileMenu: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  user: state.userReducer,
  setting: state.settingReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenClear, makeConfigAsync }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainProfileScreen);
