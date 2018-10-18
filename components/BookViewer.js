import React, { Component } from "react";
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
import PDFReader from "rn-pdf-reader-js";

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
    return (
      <View style={styles.container}>
        {Platform.OS == "ios" ? (
          <WebView
            style={{ flex: 1, width: "100%", height: "100%" }}
            onLoad={() => this.hideSpinner()}
            bounces={false}
            scrollEnabled={false}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/smatch-3fe15.appspot.com/o/MakroMail.PDF?alt=media&token=4bc34bf5-b197-4558-8d38-b925ef698a41"
            }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: -25
            }}
          >
            <PDFReader
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/smatch-3fe15.appspot.com/o/MakroMail.PDF?alt=media&token=4bc34bf5-b197-4558-8d38-b925ef698a41"
              }}
            />
          </View>
        )}

        {Platform.OS == "ios" && visible ? (
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
        ) : null}
      </View>
    );
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

export default BookViewer;
