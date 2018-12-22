import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  StyleSheet,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Constants, BarCodeScanner, Permissions } from "expo";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { FormattedMessage } from "react-intl";

class FacebookDoneScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = "Login with Facebook Successfully";
    var message =
      "To get membership value and privilege, please register to be Makro Member at your nearest Makro Store.";
    var branch1 = "1. Branch Sensok: (855) 23 977 355";
    var branch2 = "2. Branch Siem Reap: (855) 63 900 123";
    var mapword = "";

    if (this.props.setting.params.language != "en") {
      title = "ចូលជាមួយ Facebook ដោយជោគជ័យ";
      message =
        "ដើម្បីទទួលបានអត្ថប្រយោជន៍ និងសិទ្ធិអាទិភាពរបស់សមាជិក សូមចុះឈ្មោះជាសមាជិកនៅផ្សារម៉ាក្រូ ដែលនៅជិតលោកអ្នកបំផុត។";
      branch1 = "1. សាខាសែនសុខ៖ (855) 23 977 355";
      branch2 = "2. សាខាសៀមរាប៖ (855) 63 900 123";
      mapword = "";
    }

    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.logo}>
              <Image source={require("../assets/makro_cam_logo.png")} style={styles.logo__image} />
            </View>
            <View style={styles.regis__form}>
              <View style={styles.regis__icon}>
                <Ionicons name="ios-checkmark-circle" size={52} color="#4ca64c" />
              </View>
              <Text style={styles.regis__message}>{title}</Text>
              <Text style={styles.regis__sub_message}>{message}</Text>
              <Text style={{}}>
                {branch1}{" "}
                <Text
                  style={{ marginLeft: 3, color: "#0000FF", textDecorationLine: "underline" }}
                  onPress={() => navigate("MainBranch")}
                >
                  Map
                </Text>
              </Text>
              <Text style={{ marginBottom: 20 }}>
                {branch2}{" "}
                <Text
                  style={{ marginLeft: 3, color: "#0000FF", textDecorationLine: "underline" }}
                  onPress={() => navigate("MainBranch")}
                >
                  Map
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.coupon__form_submit}
                onPress={() => {
                  navigate("Main");
                }}
              >
                <Text style={styles.coupon__form_submit_text}>
                  <FormattedMessage id="register.thanks.shopnow" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  wrapper: {
    flex: 1,
    height: "100%",
    margin: 30,
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 90
  },
  logo__image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  regis__form: {
    width: "100%",
    marginTop: 40
  },
  regis__icon: {
    alignItems: "center",
    marginBottom: 20
  },
  regis__message: {
    marginBottom: 10,
    color: "#4ca64c",
    fontWeight: "bold",
    textAlign: "center"
  },
  regis__sub_message: {
    marginBottom: 20,
    textAlign: "center"
  },
  coupon__form_submit: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#da3b32",
    borderBottomWidth: Platform.OS == "ios" ? 5 : 0,
    borderBottomColor: Platform.OS == "ios" ? "#ae2f28" : "transparent"
  },
  coupon__form_submit_text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  footer: {
    flex: 0,
    padding: 30
  }
});

const mapStateToProps = state => ({
  setting: state.settingReducer
});
export default connect(mapStateToProps)(FacebookDoneScreen);
