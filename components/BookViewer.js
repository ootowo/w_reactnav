import React, { Component } from "react";
import {
  View,
  ScrollView,
  WebView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";

class BookViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      images: [
        { source: { uri: "http://i.imgur.com/gSmWCJF.jpg" } },
        { source: { uri: "http://i.imgur.com/XP2BE7q.jpg" } },
        { source: { uri: "http://i.imgur.com/5nltiUd.jpg" } },
        { source: { uri: "http://i.imgur.com/6vOahbP.jpg" } },
        { source: { uri: "http://i.imgur.com/kj5VXtG.jpg" } },
        { source: { uri: "http://i.imgur.com/BN8RVGa.jpg" } },
        { source: { uri: "http://i.imgur.com/jXbhTbv.jpg" } },
        { source: { uri: "http://i.imgur.com/30s12Qj.jpg" } },
        { source: { uri: "http://i.imgur.com/4A1Q49y.jpg" } },
        { source: { uri: "http://i.imgur.com/JfVDTF9.jpg" } },
        { source: { uri: "http://i.imgur.com/Vv4bmwR.jpg" } }
      ]
    };

    this.hideSpinner = this.hideSpinner.bind(this);
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          onLoad={() => this.hideSpinner()}
          bounces={false}
          scrollEnabled={false}
          source={{ uri: "http://www.africau.edu/images/default/sample.pdf" }}
        />{" "}
        {this.state.visible && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: "100%" / 2,
              left: "100%" / 2
            }}
            size="large"
          />
        )}{" "}
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
