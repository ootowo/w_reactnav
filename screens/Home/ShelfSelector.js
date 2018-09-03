import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

class ShelfSelectorScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Shelf Style",
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
    this.state = {
      shelfs: [
        {
          id: 0,
          file: require("../../assets/shelfs/shelf_style_1/preview/shelf.png")
        },
        {
          id: 1,
          file: require("../../assets/shelfs/shelf_style_2/preview/shelf.png")
        },
        {
          id: 2,
          file: require("../../assets/shelfs/shelf_style_3/preview/shelf.png")
        },
        {
          id: 3,
          file: require("../../assets/shelfs/shelf_style_4/preview/shelf.png"),
          used: true
        },
        {
          id: 4,
          file: require("../../assets/shelfs/shelf_style_5/preview/shelf.png")
        }
      ]
    };

    this.renderShelfItem = this.renderShelfItem.bind(this);
  }

  renderShelfItem = (item, key) => {
    const stylePath = `../../assets/shelfs/shelf_style_1/preview/shelf.png`;
    return (
      <TouchableOpacity key={key} style={styles.shelfItem}>
        {item.used ? (
          <View style={styles.shelfItem__check}>
            <FontAwesome name="check" size={15} color="#FFFFFF" />
          </View>
        ) : null}
        <View
          style={[
            styles.shelfItem__overlay,
            item.used ? styles.shelfItem__overlay_selected : null
          ]}
        >
          <Image style={styles.shelfItem__image} source={item.file} />
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.shelfList}>
          {this.state.shelfs.map(this.renderShelfItem)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  shelfList: {
    flex: 1,
    padding: 10
  },
  shelfItem: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    padding: 13
  },
  shelfItem__overlay: {
    width: "100%",
    height: "100%",
    paddingTop: 30
  },
  shelfItem__overlay_selected: {
    borderWidth: 3,
    borderColor: "#FF0000",
    borderRadius: 15
  },
  shelfItem__check: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0
  },
  shelfItem__image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});

export default ShelfSelectorScreen;
