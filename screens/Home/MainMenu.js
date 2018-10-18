import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
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

import {
  openSocialModal,
  openSelectBranchModal
} from "../../actions/modalAction";

import ProfileHeader from "../../components/ProfileHeader";
import CardHeader from "../../components/CardHeader";
import { Banner } from "../../components/Banner";

class MainMenuScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ProfileHeader navigation={navigation} />,
    headerRight: <CardHeader />
  });

  constructor(props) {
    super(props);

    this.onPressOpenWebSite = this.onPressOpenWebSite.bind(this);
  }

  async onPressOpenWebSite(address) {
    await WebBrowser.openBrowserAsync(address);
  }

  componentDidMount() {
    this.props.openSelectBranchModal();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { home } = this.props.banner;
    const homeBannerImages = home.map(banner => {
      return {
        uri: banner.filePath
      };
    });
    const homeBannerURLs = home.map(banner => {
      return banner.url;
    });

    return (
      <View style={styles.container}>
        <Image
          style={styles.redBg}
          source={require("../../assets/home_bg.png")}
        />

        <ScrollView style={styles.wrapper}>
          <Banner images={homeBannerImages} urls={homeBannerURLs} />
          <View style={styles.menuGrid}>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Coupon")}
              >
                <View>
                  <View style={styles.menuButton__badge}>
                    <Text style={styles.menuButton__badge_text}>2</Text>
                  </View>
                  <View style={styles.menuButton__icon}>
                    <Ionicons name="md-barcode" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>Member Coupon</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Mail")}
              >
                <View>
                  <View style={styles.menuButton__badge}>
                    <Text style={styles.menuButton__badge_text}>2</Text>
                  </View>
                  <View style={styles.menuButton__icon}>
                    <SimpleLineIcons
                      name="notebook"
                      color="#FF0000"
                      size={38}
                    />
                  </View>
                </View>

                <Text style={styles.menuButton__text}>Makro Mail</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("ProductCatalog")}
              >
                <View>
                  <View style={styles.menuButton__badge}>
                    <Text style={styles.menuButton__badge_text}>New</Text>
                  </View>
                  <View style={styles.menuButton__icon}>
                    <SimpleLineIcons
                      name="book-open"
                      color="#FF0000"
                      size={38}
                    />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>Catalog</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Privillage")}
              >
                <View>
                  {/* <View style={styles.menuButton__badge}>
                  <Text style={styles.menuButton__badge_text}>4</Text>
                </View> */}
                  <View style={styles.menuButton__icon}>
                    <MaterialCommunityIcons
                      name="gift"
                      color="#FF0000"
                      size={38}
                    />
                  </View>
                </View>

                <Text style={styles.menuButton__text}>Member Rewards</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("News")}
              >
                <View>
                  <View style={styles.menuButton__icon}>
                    <Entypo name="megaphone" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>News and Activities</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Entertainment")}
              >
                <View>
                  <View style={styles.menuButton__icon}>
                    <Entypo name="clapperboard" color="#FF0000" size={38} />
                  </View>
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
                onPress={() => navigate("Offer")}
              >
                <View>
                  <View style={styles.menuButton__badge}>
                    <Text style={styles.menuButton__badge_text}>3</Text>
                  </View>
                  <View style={styles.menuButton__icon}>
                    <FontAwesome name="bell-o" color="#FF0000" size={38} />
                  </View>
                </View>
                <Text style={styles.menuButton__text}>Today's Offer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGridCell}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigate("Setting")}
              >
                <View>
                  <View style={styles.menuButton__icon}>
                    <FontAwesome name="cog" color="#FF0000" size={38} />
                  </View>
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
  banner: state.bannerReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openSocialModal,
      openSelectBranchModal
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuScreen);
