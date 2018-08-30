import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class PrivillageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Rewards",
    headerTintColor: "#000000",
    headerBackTitle: null
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>PrivillageScreen</Text>
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

export default PrivillageScreen;
