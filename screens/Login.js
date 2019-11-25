import React, { Component } from "react";

import {
  View,
  ScrollView,
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
import { BarCodeScanner, Permissions, Facebook, Notifications } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FormattedMessage } from "react-intl";
import Flag from "react-native-flags";
import firebase from "expo-firebase-app";

import { _FACEBOOK_APP_ID } from "../utils/config";
import { isEmpty } from "../utils/validate";

import { makeConfigAsync } from "../actions/settingAction";
import { authenLogin, authenFacebookLogin } from "../actions/userAction";
import { makeNotificationToken } from "../apis/settingApi";
import { updatePushTokenData } from "../apis/notificationApi";

const delay = time =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      showScannerModal: false,
      memberCode: "",
      keyboardIsShown: false,
      read: null
    };

    this._requestCameraPermission = this._requestCameraPermission.bind(this);
    this.handleBarcodeReaded = this.handleBarcodeReaded.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeLang = this.handleChangeLang.bind(this);

    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);

    this.grantCameraAccess = this.grantCameraAccess.bind(this);

    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }

  componentWillMount() {}

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  changeLang(value) {
    this.props.makeConfig({ key: "language", value });
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      Alert.alert(
        "Makro Cambodia",
        "Please grant access your camera for scan your barcode",
        [
          {
            text: "Cancel",
            onPress: () => {
              this.setState({ showScannerModal: false });
            },
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              this.setState({ showScannerModal: true }, () => {
                this.grantCameraAccess();
              });
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ showScannerModal: true }, () => {
        this.grantCameraAccess();
      });
    }
  };

  grantCameraAccess = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _keyboardDidShow() {
    this.setState({ keyboardIsShown: true });
  }

  _keyboardDidHide() {
    this.setState({ keyboardIsShown: false });
  }

  handleFacebookLogin = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(_FACEBOOK_APP_ID, {
      permissions: ["email", "public_profile"]
    });
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,first_name,last_name,picture,email&access_token=${token}`
      );
      const fbData = await response.json();

      new Promise((resolve, reject) => {
        this.props.authenFacebookLogin({ accessToken: token, ...fbData }, resolve, reject);
      })
        .then(async userData => {
          try {
            const token = await firebase.iid().getToken();
            const { notification } = this.props.setting.params;
            if (!isEmpty(userData) && notification) {
              updatePushTokenData(userData.id, token);
            }
            this.props.navigation.navigate("FacebookDone");
          } catch (error) {
            console.log(error.message);
          }
        })
        .catch(error => {
          console.log(error.message);
          Alert.alert("Makro", "Error while login, please try again");
        });
    }
  };

  handleLogin = async () => {
    if (!isEmpty(this.state.memberCode)) {
      new Promise((resolve, reject) => {
        this.props.authenLogin(this.state.memberCode, resolve, reject);
      })
        .then(async user => {
          try {
            const token = await firebase.iid().getToken();
            const { notification } = this.props.setting.params;
            if (!isEmpty(user) && notification) {
              updatePushTokenData(user.id, token);
            }
            this.props.navigation.navigate("Main");
          } catch (error) {
            console.log(error.message);
          }
        })
        .catch(error => {
          console.log(error);
          Alert.alert("Error", error);
        });
    }
  };

  handleBarcodeReaded = async ({ type, data }) => {
    await delay(500);
    if (this.state.read == data) return;
    this.setState({ read: data, memberCode: data }, () => {
      this.handleLogin();
      this.setState({ read: null, showScannerModal: false });
    });
  };

  handleChangeLang() {
    const oldSetting = this.props.setting.params;
    new Promise((resolve, reject) => {
      switch (this.props.setting.params.language) {
        case "en":
          this.props.makeConfigAsync(
            {
              key: "language",
              value: "ka",
              oldSetting
            },
            resolve,
            reject
          );
          break;
        case "ka":
          this.props.makeConfigAsync(
            {
              key: "language",
              value: "en",
              oldSetting
            },
            resolve,
            reject
          );
          break;
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user, setting } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
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
              <ScrollView style={styles.wrapper} keyboardShouldPersistTaps="always">
                <View
                  style={{
                    flex: 0,
                    width: "100%",
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                  }}
                >
                  <TouchableOpacity onPress={this.handleChangeLang}>
                    <Flag code={setting.params.language == "en" ? "KH" : "US"} size={32} />
                  </TouchableOpacity>
                </View>
                <View style={styles.logo}>
                  <Image
                    source={require("../assets/makro_cam_logo.png")}
                    style={styles.logo__image}
                  />
                </View>
                <View style={styles.login__form}>
                  <Text style={styles.login__message}>
                    <FormattedMessage id="login.greeting" />
                  </Text>
                  <TouchableOpacity
                    style={styles.coupon__scanner_button}
                    onPress={() => {
                      this._requestCameraPermission();
                    }}
                  >
                    <MaterialCommunityIcons
                      style={styles.coupon__scanner_button_icon}
                      name="barcode-scan"
                      size={20}
                      color="#FFFFFF"
                    />
                    <Text style={styles.coupon__scanner_button_text}>
                      <FormattedMessage id="login.scanbarcode" />
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.form__seperator}>
                    <View style={styles.form__seperator_line} />
                    <Text style={styles.form__seperator_text}>
                      <FormattedMessage id="login.membernumber" />
                    </Text>
                  </View>
                  <FormattedMessage id="login.membernumber.field">
                    {msg => (
                      <TextInput
                        style={styles.cardid__field}
                        placeholder={msg}
                        underlineColorAndroid="transparent"
                        value={this.state.memberCode}
                        name="memberCode"
                        onChangeText={e => this.setState({ memberCode: e })}
                      />
                    )}
                  </FormattedMessage>
                  <TouchableOpacity style={styles.coupon__form_submit} onPress={this.handleLogin}>
                    <Text style={styles.coupon__form_submit_text}>
                      <FormattedMessage id="login.membernumber.submit" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              {!this.state.keyboardIsShown && (
                <View style={styles.footer}>
                  {/* <Text style={styles.footer__message}>
              For your highest benefits such as discounts and privileges, please
              register an account.
            </Text> */}

                  <TouchableOpacity
                    style={styles.facebook__login_button}
                    onPress={this.handleFacebookLogin}
                  >
                    <MaterialCommunityIcons
                      style={styles.facebook__login_button_icon}
                      name="facebook-box"
                      size={20}
                      color="#FFFFFF"
                    />
                    <Text style={styles.facebook__login_button_text}>
                      <FormattedMessage id="login.facebook" />
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
              )}
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
                <FormattedMessage id="close" />
              </Text>
            </TouchableOpacity>
          </Modal>
        </View>
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
    flexDirection: "column"
    // alignItems: "center"
  },
  logo: {
    width: 200,
    height: 90,
    alignSelf: "center"
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
  bindActionCreators({ makeConfigAsync, authenLogin, authenFacebookLogin }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
