import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

class MyOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Order",
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

    this.renderOrderItem = this.renderOrderItem.bind(this);
  }

  renderOrderItem = ({ item, index }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderItem__header}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>Order No. 12345678</Text>
          <Text style={{ fontSize: 12, color: "#808080" }}>Order from 1 July 2018 10:20:20</Text>
          <Text style={{ fontSize: 12, color: "#808080" }}>Paid on 3 July 2018 11:30:53</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
          <Text style={{ fontSize: 12, color: "#808080" }}>Already Paid</Text>
        </View>
      </View>
      <View style={styles.productItem}>
        <Image style={styles.productItem__image} source={item.image} />
        <View style={styles.productItem__detail}>
          <Text style={styles.productItem__detail_name} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productItem__detail_price}>฿{item.special_price.toFixed(2)}</Text>
          <Text style={styles.productItem__detail_oldprice}>x{item.qty}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <View style={styles.productItem__udQty}>
            <View style={styles.productItem__udQty_text}>
              <Text style={{ color: "#404040", fontSize: 12, marginRight: 5 }}>Shipped</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.orderItem__footer}>
        <Text style={{ fontSize: 12 }}>1 Piece, Total Price:</Text>
        <Text style={{ fontSize: 16, color: "#FF0000", marginLeft: 10 }}>฿1000.00</Text>
      </View>
    </View>
  );

  render() {
    const { cartData } = this.state;
    return (
      <View style={styles.container}>
        <FlatList data={cartData} renderItem={this.renderOrderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  orderItem: {
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#F8F8F8",
    borderBottomWidth: 1
  },
  orderItem__header: {
    padding: 10,
    paddingBottom: 0,
    flexDirection: "row"
  },
  orderItem__footer: {
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    flexDirection: "row"
  },
  productItem: {
    width: "100%",
    padding: 10,
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
    color: "#000000"
  },
  productItem__detail_oldprice: {
    fontSize: 12,
    color: "#808080"
  },
  productItem__udQty: {
    flexDirection: "row",
    height: 24
  },
  productItem__udQty_text: {
    height: 24,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default MyOrderScreen;
