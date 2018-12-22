import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

class OfficialWebScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>OfficialWebScreen</Text>
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

export default OfficialWebScreen;
