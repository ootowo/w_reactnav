import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import React, { Component } from "react";

import CoreModal from "../modals";
import MainStack from "../navigations";

import { makeConfig, makeConfigAsync, syncConfig } from "../actions/settingAction";
import { syncAuthen } from "../actions/userAction";
import { setData, getData } from "../db";
import { checkNotificationGrant, fetchConfigFromDB } from "../apis/settingApi";
import { fetchBanner } from "../actions/bannerAction";

import lang from "../locales";

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
    fetchConfigFromDB().then(res => {
      this.props.syncConfig(res);
      this.props.fetchBanner();

      this.firstTimeRunning();
      this.setState({ loading: false });
    });
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

  render() {
    const { loading } = this.state;
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
    } else {
      return (
        <IntlProvider
          locale={this.props.setting.params.language}
          messages={lang[this.props.setting.params.language]}
          textComponent={Text}
          key={this.props.setting.params.language}
        >
          <View style={{ width: "100%", height: "100%" }}>
            <MainStack />
            <CoreModal />
          </View>
        </IntlProvider>
      );
    }
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
