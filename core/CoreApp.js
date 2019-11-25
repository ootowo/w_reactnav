import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { View, Text, ActivityIndicator, Alert, Platform } from "react-native";
import React, { Component } from "react";
import firebase from "expo-firebase-app";
import NotificationPopup from "react-native-push-notification-popup";
import { Permissions } from "expo";

import CoreModal from "../modals";
import MainStack from "../navigations";

import { makeConfig, makeConfigAsync, syncConfig } from "../actions/settingAction";
import { syncAuthen } from "../actions/userAction";
import { setData, getData } from "../db";
import { checkNotificationGrant, fetchConfigFromDB } from "../apis/settingApi";
import { fetchBanner } from "../actions/bannerAction";
import { isEmpty } from "../utils/validate";
import { updatePushTokenData } from "../apis/notificationApi";

import lang from "../locales";
import { _DEFAULT_SYS_VAR } from "../utils/config";

const getActiveRouteName = navigationState => {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];

  if (route.routes) return getActiveRouteName(route);
  return route.routeName;
};

class CoreApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.firstTimeRunning = this.firstTimeRunning.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchConfigFromDB().then(async res => {
      this.props.syncConfig(res);
      this.props.fetchBanner();

      this.firstTimeRunning();
      this._setupNotifications();
      // this._setupLocation();

      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  firstTimeRunning() {
    getData("sysVar", (error, res) => {
      if (res == null || res.firstTime) {
        // Running in first time
        setData({ _id: "sysVar", firstTime: false }, () => {
          let status = checkNotificationGrant();
          if (status !== "granted") {
            // Make ringtone notification
            new Promise((resolve, reject) => {
              this.props.makeConfigAsync(
                {
                  key: "ringtone",
                  value: true,
                  oldSetting: this.props.setting.params
                },
                resolve,
                reject
              );
            })
              .then(res => {
                // Make notification
                new Promise((resolve, reject) => {
                  this.props.makeConfigAsync(
                    {
                      key: "notification",
                      value: true,
                      oldSetting: this.props.setting.params
                    },
                    resolve,
                    reject,
                    true
                  );
                }).then(res => {
                  this._setupLocation();
                });
              })
              .catch(error => {
                Alert.alert("Error", JSON.stringify(error));
              });
          }
        });
      }
    });
  }

  _setupNotifications = async () => {
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log("onNotificationDisplayed", notification);
      });
    this.notificationListener = firebase.notifications().onNotification(notification => {
      // Process your notification as required
      console.log("onNotification", notification);
    });
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log("onNotificationOpened", notificationOpen);
      });

    this.messageListener = firebase.messaging().onMessage(message => {
      // Process your message as required
      this.popup.show({
        onPress: () => {
          console.log("pressed");
        },
        appIconSource: require("../assets/app_icon/icon.png"),
        appTitle: "Makro Cambodia",
        timeText: "Now",
        title: message._data.title,
        body: message._data.message
      });
      console.log("onMessage", message);
    });
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // Process your token as required
      const { user } = this.props.user;
      const { notification } = this.props.setting.params;
      if (!isEmpty(user) && notification) {
        updatePushTokenData(user.id, fcmToken);
        console.log("onTokenRefresh", fcmToken);
      }
    });

    // expo-firebase-notifications: 1.0.0-rc.5
    const initial = await firebase.notifications().getInitialNotification();
    if (initial) {
      const { notification, action } = initial;
      console.log("Got Initial Notification:", { notification, action });
    }

    const invite = await firebase.invites().getInitialInvitation();
    if (invite) {
      const { deepLink, invitationId } = invite;
      console.log("Got Initial Invite:", { deepLink, invitationId });
    }
  };

  _setupLocation = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert(
        "Makro Cambodia",
        "Please grant access your location for finding nearby makro branch",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              this.grantLocationAccess();
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  grantLocationAccess = async () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      Alert.alert(
        "Error",
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      new Promise((resolve, reject) => {
        this.props.makeConfigAsync(
          {
            key: "location",
            value: status !== "granted",
            oldSetting: this.props.setting.params
          },
          resolve,
          reject,
          true
        );
      });
    }
  };

  render() {
    const { loading } = this.state;
    const { params } = this.props.setting;
    const language = params.language;

    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <IntlProvider locale={language} messages={lang[language]} textComponent={Text} key={language}>
        <View style={{ width: "100%", height: "100%" }}>
          <NotificationPopup ref={ref => (this.popup = ref)} />
          <MainStack
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getActiveRouteName(currentState);
              const prevScreen = getActiveRouteName(prevState);
              if (prevScreen !== currentScreen) {
                firebase.analytics().setCurrentScreen(currentScreen);
              }
            }}
          />
          <CoreModal />
        </View>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  setting: state.settingReducer,
  user: state.userReducer,
  banner: state.bannerReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      makeConfigAsync,
      syncConfig,
      fetchBanner,
      syncAuthen
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreApp);
