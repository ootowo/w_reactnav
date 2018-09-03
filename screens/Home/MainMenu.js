import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { Button, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Constants, WebBrowser } from "expo";
import { bindActionCreators } from "redux";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Entypo
} from "@expo/vector-icons";

import { openSocialModal } from "../../actions/modalAction";
import ProfileHeader from "../../components/ProfileHeader";
import CardHeader from "../../components/CardHeader";
import { Banner } from "../../components/Banner";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import css from "../../styles";

class MainMenuScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ProfileHeader />,
    headerRight: <CardHeader />
  });

  constructor(props) {
    super(props);
  }

  async onPressOpenWebSite() {
    await WebBrowser.openBrowserAsync("https://www.makroclick.com");
  }

  async onPressBanner() {
    await WebBrowser.openBrowserAsync("https://www.google.co.th");
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          style={styles.redBg}
          source={require("../../assets/home_bg.png")}
        />

        <ScrollView style={styles.wrapper}>
          <Banner
            image={{
              uri:
                "http://www.brandage.com/images/content/41F1919-D18E73D-078048E.png"
            }}
          />
          <View style={styles.menuGrid}>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Coupon")}
              >
                <View style={styles.menuButton__icon}>
                  <Ionicons name="md-barcode" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>Coupon</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Mail")}
              >
                <View style={styles.menuButton__icon}>
                  <SimpleLineIcons name="notebook" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>Makro Mails</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("ProductCatalog")}
              >
                <View style={styles.menuButton__icon}>
                  <SimpleLineIcons name="book-open" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>Catalog</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Privillage")}
              >
                <View style={styles.menuButton__icon}>
                  <MaterialCommunityIcons
                    name="gift"
                    color="#FF0000"
                    size={40}
                  />
                </View>
                <Text style={styles.menuButton__text}>Rewards</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("News")}
              >
                <View style={styles.menuButton__icon}>
                  <Entypo name="megaphone" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>News and Activity</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Entertainment")}
              >
                <View style={styles.menuButton__icon}>
                  <Entypo name="clapperboard" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>Entertainment</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={this.props.openSocialModal}
              >
                <View style={styles.menuButton__icon}>
                  <SimpleLineIcons name="globe" color="#FF0000" size={40} />
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
                  <SimpleLineIcons name="mouse" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>Makro Click!</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Offer")}
              >
                <View style={styles.menuButton__icon}>
                  <FontAwesome name="bell-o" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>Today Offer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Setting")}
              >
                <View style={styles.menuButton__icon}>
                  <FontAwesome name="cog" color="#FF0000" size={40} />
                </View>
                <Text style={styles.menuButton__text}>Settings</Text>
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
    padding: 15
  },
  menuButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  menuButton__icon: {
    width: 90,
    height: 90,
    paddingTop: 2,
    paddingLeft: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
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
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ openSocialModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuScreen);
