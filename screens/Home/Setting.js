import React, { Component } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
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

class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
    this.state = {
      LANG_BUTTONS: ["English", "ไทย", "cancel"],
      LANG_CANCEL_INDEX: 2,
      LANG_CLICKED_INDEX: -1,
      ringtones: false,
      ringtones_disabled: false,
      notification: false
    };
  }

  componentDidMount() {
    if (!this.state.notification) {
      this.setState({ ringtones_disabled: true });
    }
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
                      value={this.state.ringtones}
                      onValueChange={value => {
                        this.setState({ ringtones: value });
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
                      value={this.state.notification}
                      onValueChange={value => {
                        if (value) {
                          this.setState({
                            ringtones_disabled: false,
                            notification: value
                          });
                        } else {
                          this.setState({
                            ringtones_disabled: true,
                            notification: value,
                            ringtones: false
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
                        title: "กรุณาเลือกภาษา"
                      },
                      buttonIndex => {
                        this.setState({ LANG_CLICKED_INDEX: buttonIndex });
                      }
                    )
                  }
                >
                  <Body>
                    <Text>Languages</Text>
                    <Text note numberOfLines={1}>
                      English
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
                      Style 1
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

export default SettingScreen;
