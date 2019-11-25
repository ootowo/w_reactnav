import React, { Component } from "react";

import {
  View,
  ScrollView,
  WebView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import HeaderTitle from "../../components/HeaderTitle";
import ShareHeader from "../../components/ShareHeader";
import { mockHtml } from "../../web/html";

class NewsView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="news" />,
    headerBackTitle: null,
    headerTintColor: "#000000",
    headerRight: <ShareHeader share={false} />
  });
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { language } = this.props.setting.params;
    const newsDetail = this.props.navigation.getParam("news_data");

    let newsTitle = "",
      newsContent = "";
    if (language == "en") {
      newsTitle = newsDetail.name;
      newsContent = newsDetail.description;
    } else {
      newsTitle = newsTitle.name_cambodia;
      newsContent = newsDetail.description_cambodia;
    }

    return (
      <View style={styles.container}>
        <WebView
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
          source={{
            html: mockHtml(
              newsDetail.file_path,
              newsTitle,
              newsContent,
              newsDetail.url_link,
              this.props.fontSize.size
            )
          }}
        />
      </View>
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
  fontSize: state.fontSizeReducer,
  setting: state.settingReducer
});
export default connect(mapStateToProps)(NewsView);
