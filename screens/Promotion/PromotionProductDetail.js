import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

class PromotionProductDetailScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PromotionProductDetailScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default PromotionProductDetailScreen;
