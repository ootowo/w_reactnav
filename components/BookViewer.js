import PropTypes from "prop-types";
import React, { Component } from "react";
import { _API_ENDPOINT } from "../utils/config";

import {
  View,
  ScrollView,
  WebView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform
} from "react-native";
// import PDFReader from "rn-pdf-reader-js";
import { isEmpty } from "../utils/validate";

class BookViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };

    this.hideSpinner = this.hideSpinner.bind(this);
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const { file_id, type } = this.props;

    if (isEmpty(file_id)) {
      return (
        <View>
          <Text>No Pdf File</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {visible && (
            <View
              style={{
                flex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#FFFFFF",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          )}
          <WebView
            style={{ flex: 1, width: "100%", height: "100%" }}
            onLoad={() => this.hideSpinner()}
            bounces={false}
            scrollEnabled={false}
            source={{ uri: `${_API_ENDPOINT}${type}/viewPdf?fileId=${file_id}` }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    width: "100%",
    height: "100%"
  }
});

BookViewer.propTypes = {
  uri: PropTypes.string
};
export default BookViewer;
