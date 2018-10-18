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
import ShareHeader from "../../components/ShareHeader";
import { mockHtml } from "../../web/html";

class OfferView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Offer View",
    headerBackTitle: null,
    headerTintColor: "#000000",
    headerRight: <ShareHeader />
  });

  constructor(props) {
    super(props);
  }
  render() {
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
              "https://www.siammakro.co.th/imgadmins/makromail/big/20907_20180720_162743.jpg",
              "ห้ามพลาด สินค้าสุดพิเศษกับนมยูเอชทีแลคตาซอย",
              null,
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
  fontSize: state.fontSizeReducer
});
export default connect(mapStateToProps)(OfferView);
