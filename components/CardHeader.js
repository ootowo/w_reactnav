import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";

class CardHeader extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Image
          style={styles.card__image}
          source={require("../assets/makro_card.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: 55,
    height: 35,
    marginRight: 10
  },
  card__image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  }
});

export default CardHeader;
