import { Octicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

class MapPopup extends Component {
  render() {
    return (
      <View style={styles.popout}>
        <View style={styles.popout__detail}>
          <Text style={styles.popout__detail_name}>{this.props.title}</Text>
          <Text style={styles.popout__detail_address}>{this.props.address}</Text>
          <Text style={styles.popout__detail_tel}>{this.props.tel}</Text>
        </View>
        <View style={styles.popout__arrow}>
          <Octicons name="triangle-down" color="#FFFFFF" size={20} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popout: {
    width: 160,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  popout__detail: {
    flex: 1,
    width: "100%",
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.1
  },
  popout__detail_name: {
    fontWeight: "bold",
    marginBottom: 5
  },
  popout__detail_address: {
    fontSize: 13,
    marginBottom: 10
  },
  popout__detail_tel: {
    fontSize: 13
  },
  popout__arrow: {
    flex: 0,
    position: "absolute",
    bottom: 0
  }
});

export default MapPopup;
