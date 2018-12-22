import { View, Text } from "react-native";
import React, { Component } from "react";

import BookViewer from "../../components/BookViewer";
import HeaderTitle from "../../components/HeaderTitle";

class MailView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="home.menu.mail" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });
  render() {
    const { navigation } = this.props;
    const file_id = navigation.getParam("file_pdf_id");
    return <BookViewer file_id={file_id} type="maillist" />;
  }
}

export default MailView;
