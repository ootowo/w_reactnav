import React, { Component } from "react";
import { View, Text } from "react-native";

import BookViewer from "../../components/BookViewer";

class ProductCatelogView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Catelog",
    headerTintColor: "#000000",
    headerBackTitle: null
  });
  render() {
    return <BookViewer />;
  }
}

export default ProductCatelogView;
