import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EvilIcons } from "@expo/vector-icons";

class CartScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Cart",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      cartData: [
        {
          name: "Carnation Unsweeted",
          qty: 1,
          price: 1029,
          special_price: 1000,
          image: { uri: "https://dynamic-cdn-makro.makroclick.com/bIaaxXP42.png" }
        }
      ]
    };

    this.renderProductItem = this.renderProductItem.bind(this);
    this.renderEmptyScreen = this.renderEmptyScreen.bind(this);
  }

  renderProductItem = ({ item, index }) => (
    <View style={styles.productItem}>
      <Image style={styles.productItem__image} source={item.image} />
      <View style={styles.productItem__detail}>
        <Text style={styles.productItem__detail_name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productItem__detail_price}>฿{item.special_price.toFixed(2)}</Text>
        <Text style={styles.productItem__detail_oldprice}>฿{item.price.toFixed(2)}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <View style={styles.productItem__udQty}>
          <TouchableOpacity style={styles.productItem__udQty_ctrl}>
            <Text>-</Text>
          </TouchableOpacity>
          <View style={styles.productItem__udQty_text}>
            <Text>{`${item.qty}`}</Text>
          </View>
          <TouchableOpacity style={styles.productItem__udQty_ctrl}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <EvilIcons name="trash" size={30} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  renderEmptyScreen() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.emptyScreen__text}>There are no items in this cart.</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            navigate("MainProduct");
          }}
        >
          <Text style={styles.closeButton__text}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { cartData } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {cartData.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList data={cartData} renderItem={this.renderProductItem} />
            <Text style={{ color: "#FF0000", textAlign: "center", paddingVertical: 10 }}>
              + Add More Product
            </Text>
            <View style={styles.footer}>
              <View style={styles.footer__detail}>
                <Text>
                  Total Price:{" "}
                  <Text style={{ color: "#FF0000", fontWeight: "bold" }}>฿1000.00</Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.footer__checkoutButton}
                onPress={() => navigate("Checkout")}
              >
                <Text style={styles.footer__checkoutButton_text}>Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          this.renderEmptyScreen()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  emptyScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyScreen__text: { fontSize: 18, fontWeight: "bold", marginBottom: 20, color: "#CCCCCC" },
  productItem: {
    width: "100%",
    padding: 10,
    paddingRight: 0,
    borderBottomColor: "#F8F8F8",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  productItem__image: {
    width: 80,
    height: 80,
    resizeMode: "cover"
  },
  productItem__detail: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "center"
  },
  productItem__detail_name: {
    fontWeight: "bold",
    marginBottom: 5
  },
  productItem__detail_price: {
    color: "#FF0000"
  },
  productItem__detail_oldprice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#CCCCCC"
  },
  productItem__udQty: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    flexDirection: "row",
    height: 24
  },
  productItem__udQty_ctrl: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  productItem__udQty_text: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#CCCCCC",
    height: 24,
    paddingHorizontal: 12,
    justifyContent: "center"
  },
  footer: { backgroundColor: "#F8F8F8", flexDirection: "row" },
  footer__detail: { padding: 10, flex: 1, justifyContent: "center", alignItems: "flex-end" },
  footer__checkoutButton: {
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    height: 60
  },
  footer__checkoutButton_text: { color: "#FFFFFF", fontWeight: "bold" },
  closeButton: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 40,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF0000"
  },
  closeButton__text: {
    fontWeight: "bold",
    color: "#FF0000",
    fontSize: 16
  }
});

const mapStateToProps = state => ({
  user: state.userReducer
});
export default connect(mapStateToProps)(CartScreen);
