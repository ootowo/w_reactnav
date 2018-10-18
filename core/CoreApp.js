import React, { Component } from "react";
import { View, Text } from "react-native";
import { IntlProvider } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { GuestStack, LoggedInStack } from "../navigations";
import CoreModal from "../modals";

import {
  makeConfig,
  makeConfigAsync,
  syncConfig
} from "../actions/settingAction";
import { setData, getData } from "../db";
import { checkNotificationGrant, fetchConfigFromDB } from "../apis/settingApi";
import { fetchBanner } from "../actions/bannerAction";

class CoreApp extends Component {
  constructor(props) {
    super(props);
    this.firstTimeRunning = this.firstTimeRunning.bind(this);
  }

  componentDidMount() {
    fetchConfigFromDB().then(res => {
      // Sync from LocalDB to redux
      this.props.syncConfig(res);
      this.props.fetchBanner();

      this.firstTimeRunning();
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
    const { user } = this.props.user;
    return (
      <IntlProvider
        locale={this.props.setting.params.language}
        textComponent={Text}
      >
        <View style={{ width: "100%", height: "100%" }}>
          {user === {} ? <LoggedInStack /> : <GuestStack />}
          <CoreModal />
        </View>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  setting: state.settingReducer,
  user: state.userReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      makeConfig,
      makeConfigAsync,
      syncConfig,
      fetchBanner
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreApp);
