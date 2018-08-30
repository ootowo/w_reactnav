import React, { Component } from "react";
import {
  AppState,
  View,
  ScrollView,
  Text,
  Dimensions,
  WebView,
  StyleSheet,
  Share,
  TouchableHighlight
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class EntertainmentView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Entertainment",
    headerBackTitle: null,
    headerTintColor: "#000000",
    headerRight: (
      <TouchableHighlight
        style={{ marginRight: 15 }}
        onPress={() => {
          Share.share(
            {
              title: "Test Share",
              message: "This message has a title",
              url: "https://www.youtube.com/watch?v=IQKbhNIZMO0"
            },
            {
              dialogTitle: "Test Share",
              excludedActivityTypes: [
                "com.apple.UIKit.activity.PostToTwitter",
                "com.apple.uikit.activity.mail"
              ]
            }
          )
            .then(result => console.log(result))
            .catch(errorMsg => console.log(errorMsg));
        }}
      >
        <Ionicons name="ios-share-outline" size={25} />
      </TouchableHighlight>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };

    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange(nextAppState) {
    this.setState({ appState: nextAppState });
  }
  render() {
    const htmlEmbed = `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body style="margin: 0; padding: 0;">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/IQKbhNIZMO0?autoplay=1" frameborder="0" allowfullscreen></iframe>
                </body>
            </html>
        `;
    return (
      <View style={styles.container}>
        <View style={styles.player}>
          {this.state.appState == "active" && (
            <WebView
              style={styles.player__embed}
              javaScriptEnabled={true}
              source={{
                html: htmlEmbed
              }}
            />
          )}
        </View>
        <View style={styles.wrapper}>
          <View style={styles.head}>
            <Text style={styles.head__title}>โชห่วย โชว์ซ่า ท้ารวย EP.1</Text>
            <Text style={styles.head__date}>Published on Dec 06, 2560</Text>
          </View>
          <ScrollView style={styles.description}>
            <Text style={styles.description__text}>
              "โชห่วย โชว์ซ่า ท้ารวย" เฟ้นหาคนรุ่นใหม่ ที่อยากเป็นเจ้าของร้าน
              เพื่อชิงรางวัลเงินสดมูลค่ารวมกว่า 400,000
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  player: {
    flex: 0,
    height: 240,
    alignItems: "center",
    justifyContent: "center"
  },
  player__embed: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 150
  },
  wrapper: {
    flex: 1,
    padding: 15
  },
  head: {
    flex: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 10
  },
  head__title: {
    fontWeight: "bold",
    marginBottom: 5
  },
  head__date: {},
  description: {
    flex: 1,
    paddingTop: 10
  },
  description__text: {
    fontSize: 15
  }
});

export default EntertainmentView;
