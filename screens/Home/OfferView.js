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
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HeaderTitle from "../../components/HeaderTitle";
import ShareHeader from "../../components/ShareHeader";
import { mockHtml } from "../../web/html";

class OfferView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="home.menu.offer" />,
    headerBackTitle: null,
    headerTintColor: "#000000",
    headerRight: <ShareHeader share={false} />
  });

  constructor(props) {
    super(props);
  }
  render() {
    const { language } = this.props.setting.params;
    const offerDetail = this.props.navigation.getParam("offer_detail");

    let offerTitle = "",
      offerContent = "";
    if (language == "en") {
      offerTitle = offerDetail.name;
      offerContent = offerDetail.description;
    } else {
      offerTitle = offerDetail.name_cambodia;
      offerContent = offerContent.description_cambodia;
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
              offerDetail.file_path,
              offerTitle,
              offerContent,
              offerDetail.url_link,
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
export default connect(mapStateToProps)(OfferView);
