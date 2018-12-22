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
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import HeaderTitle from "../../components/HeaderTitle";

import ShareHeader from "../../components/ShareHeader";

class EntertainmentView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="entertain" />,
    headerBackTitle: null,
    headerTintColor: "#000000",
    headerRight: <ShareHeader fontSize={false} share={false} />
  });

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };

    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this.youtubeParser = this.youtubeParser.bind(this);
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

  youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  render() {
    const { language } = this.props.setting.params;
    const entertainData = this.props.navigation.getParam("entertain_data");

    let entertainTitle = "",
      entertainDescription = "";

    if (language == "en") {
      entertainTitle = entertainData.name;
      entertainDescription = entertainData.description;
    } else {
      entertainTitle = entertainData.name_cambodia;
      entertainDescription = entertainData.description_cambodia;
    }

    const htmlEmbed = `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body style="margin: 0; padding: 0;">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${this.youtubeParser(
                      entertainData.url
                    )}?autoplay=1" frameborder="0" allowfullscreen></iframe>
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
            <Text style={styles.head__title}>{entertainTitle}</Text>
            <Text style={styles.head__date}>
              <FormattedMessage id="entertain.publish" />{" "}
              {moment(entertainData.valid_from_date, "YYYY-MM-DD").format("MMM YYYY, DD")}
            </Text>
          </View>
          <ScrollView style={styles.description}>
            <Text style={styles.description__text}>{entertainDescription}</Text>
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

const mapStateToProps = state => ({
  setting: state.settingReducer
});
export default connect(mapStateToProps)(EntertainmentView);
