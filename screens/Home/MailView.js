import React, { Component } from "react";
import { View, Text } from "react-native";

import BookViewer from "../../components/BookViewer";

class MailView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Makro Mail",
    headerTintColor: "#000000",
    headerBackTitle: null
  });
  render() {
    return <BookViewer />;
  }
}

export default MailView;