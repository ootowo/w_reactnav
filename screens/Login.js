import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Modal,
  StyleSheet,
  Alert,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BarCodeScanner, Permissions, Facebook } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { _FACEBOOK_APP_ID } from "../utils/config";

import { makeConfig } from "../actions/settingAction";
import { authenLogin, authenFacebookLogin } from "../actions/userAction";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      showScannerModal: false,
      memberCode: ""
    };
    this._requestCameraPermission = this._requestCameraPermission.bind(this);
    this.handleBarcodeReaded = this.handleBarcodeReaded.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeLang(value) {
    this.props.makeConfig({ key: "language", value });
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  handleFacebookLogin = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      _FACEBOOK_APP_ID,
      {
        permissions: ["email", "public_profile"]
      }
    );
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,first_name,last_name,picture,email&access_token=${token}`
      );
      const fbData = await response.json();
      // this.props.authenFacebookLogin({ accessToken: token });
      // this.props.navigation.navigate("FacebookDone");
    }
  };

  handleLogin() {
    // this.props.authenLogin({ memberCode: this.state.memberCode });
    Alert.alert("Error", "Member code not found");
    this.props.navigation.navigate("Main");
  }

  handleBarcodeReaded({ type, data }) {
    // this.props.authenLogin({ memberCode: this.state.memberCode });
    console.log(JSON.stringify(data));
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {user.loading ? (
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
            <View style={{ flex: 1 }}>
              <View style={styles.wrapper}>
                <View style={styles.logo}>
                  <Image
                    source={require("../assets/makro_cam_logo.png")}
                    style={styles.logo__image}
                  />
                </View>
                <View style={styles.login__form}>
                  <Text style={styles.login__message}>
                    Makro Member, Please Scan Barcode for Login
                  </Text>
                  <TouchableOpacity
                    style={styles.coupon__scanner_button}
                    onPress={() => this.setState({ showScannerModal: true })}
                  >
                    <MaterialCommunityIcons
                      style={styles.coupon__scanner_button_icon}
                      name="barcode-scan"
                      size={20}
                      color="#FFFFFF"
                    />
                    <Text style={styles.coupon__scanner_button_text}>
                      Barcode Scan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.form__seperator}>
                    <View style={styles.form__seperator_line} />
                    <Text style={styles.form__seperator_text}>
                      Or enter member id
                    </Text>
                  </View>
                  <TextInput
                    style={styles.cardid__field}
                    placeholder="Member Card ID"
                    underlineColorAndroid="transparent"
                    value={this.state.memberCode}
                    name="memberCode"
                    onChange={this.onChange}
                  />
                  <TouchableOpacity
                    style={styles.coupon__form_submit}
                    onPress={() => {
                      navigate("Main");
                    }}
                  >
                    <Text style={styles.coupon__form_submit_text}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.footer}>
                {/* <Text style={styles.footer__message}>
              For your highest benefits such as discounts and privileges, please
              register an account.
            </Text> */}
                <TouchableOpacity
                  style={styles.facebook__login_button}
                  onPress={() => navigate("FacebookDone")}
                >
                  <MaterialCommunityIcons
                    style={styles.facebook__login_button_icon}
                    name="facebook-box"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.facebook__login_button_text}>
                    Login with Facebook
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[styles.coupon__form_submit, { marginTop: 10 }]}
                  onPress={() => {
                    navigate("Register");
                  }}
                >
                  <Text style={styles.coupon__form_submit_text}>Register</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          )}
          <Modal
            visible={this.state.showScannerModal}
            animationType="slide"
            onRequestClose={() => {}}
          >
            <BarCodeScanner
              style={{ flex: 1 }}
              type={BarCodeScanner.Constants.Type.back}
              onBarCodeScanned={this.handleBarcodeReaded}
              barCodeTypes={[
                BarCodeScanner.Constants.BarCodeType.qr,
                BarCodeScanner.Constants.BarCodeType.pdf417
              ]}
            />
            <TouchableOpacity
              style={{
                flex: 0,
                width: "100%",
                backgroundColor: "#FF0000",
                alignItems: "center",
                padding: 20
              }}
              onPress={() => this.setState({ showScannerModal: false })}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFFFFF"
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </Modal>
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
  login__form: {
    width: "100%",
    marginTop: 40
  },
  login__message: {
    marginBottom: 10,
    textAlign: "center"
  },
  footer__message: {
    marginBottom: 10,
    textAlign: "center",
    color: "#555555"
  },
  form__seperator: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  form__seperator_line: {
    width: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "#9e9fa3",
    position: "absolute",
    top: "50%" - 1
  },
  form__seperator_text: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 40
  },
  coupon__scanner_button: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#3478da"
  },
  coupon__scanner_button_icon: {
    marginRight: 15
  },
  coupon__scanner_button_text: {
    color: "#FFFFFF",
    fontWeight: "bold"
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
  cardid__field: {
    borderColor: "#b9b8b9",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: "center"
  },
  footer: {
    flex: 0,
    padding: 30
  },
  facebook__login_button: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#415893",
    borderBottomWidth: Platform.OS == "ios" ? 5 : 0,
    borderBottomColor: Platform.OS == "ios" ? "#36487b" : "transparent"
  },
  facebook__login_button_icon: {
    marginRight: 15
  },
  facebook__login_button_text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  setting: state.settingReducer,
  user: state.userReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { makeConfig, authenLogin, authenFacebookLogin },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
