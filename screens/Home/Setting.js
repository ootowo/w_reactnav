import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, Alert } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Root,
  Container,
  Content,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Icon,
  ActionSheet
} from "native-base";
import call from "react-native-phone-call";

import { checkNotificationGrant } from "../../apis/settingApi";
import { makeConfig, makeConfigAsync } from "../../actions/settingAction";

class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
    this.state = {
      LANG_BUTTONS: ["English", "Cambodia", "Cancel"],
      LANG_BUTTON_VALUES: ["en", "ka"],
      LANG_CANCEL_INDEX: 2,
      LANG_CLICKED_INDEX: -1,
      ringtones_disabled: false
    };

    this.setConfig = this.setConfig.bind(this);
  }

  componentDidMount() {
    if (!this.props.setting.params.notification) {
      this.setState({ ringtones_disabled: true });
    }
  }

  setConfig({ key, value }) {
    const oldSetting = this.props.setting.params;
    return new Promise((resolve, reject) => {
      this.props.makeConfigAsync({ key, value, oldSetting }, resolve, reject);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Root>
        <View style={styles.container}>
          <Container>
            <Content>
              <List>
                <ListItem>
                  <Body>
                    <Text>Version</Text>
                    <Text note numberOfLines={1}>
                      3.4 (17)
                    </Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <Body>
                    <Text>Ringtones</Text>
                  </Body>
                  <Right>
                    <Switch
                      disabled={this.state.ringtones_disabled}
                      value={this.props.setting.params.ringtone}
                      onValueChange={value => {
                        this.setConfig({ key: "ringtone", value });
                      }}
                    />
                  </Right>
                </ListItem>
                <ListItem>
                  <Body>
                    <Text>Notifications</Text>
                    <Text note numberOfLines={1}>
                      Turn On/Off Notifications
                    </Text>
                  </Body>
                  <Right>
                    <Switch
                      value={this.props.setting.params.notification}
                      onValueChange={value => {
                        if (value) {
                          const grant = checkNotificationGrant();
                          if (grant !== "granted") {
                            this.setConfig({ key: "notification", value });
                            this.setState({
                              ringtones_disabled: false
                            });
                          }
                        } else {
                          if (this.props.setting.params.ringtone) {
                            this.setConfig({
                              key: "ringtone",
                              value: false
                            }).then(() => {
                              this.setConfig({ key: "notification", value });
                            });
                          } else {
                            this.setConfig({ key: "notification", value });
                          }
                          this.setState({
                            ringtones_disabled: true
                          });
                        }
                      }}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: this.state.LANG_BUTTONS,
                        cancelButtonIndex: this.state.LANG_CANCEL_INDEX,
                        title: "Please Select Language"
                      },
                      buttonIndex => {
                        if (buttonIndex < this.state.LANG_BUTTONS.length - 1) {
                          this.setConfig({
                            key: "language",
                            value: this.state.LANG_BUTTON_VALUES[buttonIndex]
                          });
                        }
                        this.setState({ LANG_CLICKED_INDEX: buttonIndex });
                      }
                    )
                  }
                >
                  <Body>
                    <Text>Language</Text>
                    <Text note numberOfLines={1}>
                      {this.state.LANG_BUTTON_VALUES.map((lang, key) => {
                        if (this.props.setting.params.language == lang) {
                          return this.state.LANG_BUTTONS[key];
                        }
                      })}
                    </Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem onPress={() => navigate("ShelfSelector")}>
                  <Body>
                    <Text>Shelf Style</Text>
                    <Text note numberOfLines={1}>
                      Style {this.props.setting.params.shelf}
                    </Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem
                  onPress={() =>
                    call({ number: "023355300", prompt: true }).catch(
                      console.error
                    )
                  }
                >
                  <Body>
                    <Text>Contact Us</Text>
                    <Text note numberOfLines={1}>
                      02-335-5300
                    </Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => ({
  setting: state.settingReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ makeConfig, makeConfigAsync }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingScreen);
