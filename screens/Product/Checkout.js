import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";

class CheckoutScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Payment",
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
      ],
      emailEditDialogVisible: false,
      email: "goodday@gmail.com"
    };

    this.renderProductItem = this.renderProductItem.bind(this);
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
          <View style={styles.productItem__udQty_text}>
            <Text style={{ color: "#404040", fontSize: 12, marginRight: 5 }}>Quantity</Text>
            <Text>{`${item.qty}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  render() {
    const { cartData, emailEditDialogVisible, email } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.checkout__detail}>
            <View style={styles.checkout__detail_header}>
              <Text style={styles.checkout__detail_header_title}>Shipping Address</Text>
              <Text
                style={styles.checkout__detail_header_right}
                onPress={() => navigate("EditShipAddress")}
              >
                Edit
              </Text>
            </View>
            <View style={styles.checkout__detail_desc}>
              <Text style={styles.checkout__detail_desc_text}>Mr.Goodday</Text>
              <Text style={styles.checkout__detail_desc_sub_text}>
                174 Oom Noi, Samut Sakorn, Thailand 74130
              </Text>
            </View>
          </View>
          <View style={styles.checkout__detail}>
            <View style={styles.checkout__detail_header}>
              <Text style={styles.checkout__detail_header_title}>Tax Invoice Address</Text>
              <Text
                style={styles.checkout__detail_header_right}
                onPress={() => navigate("EditInvoiceAddress")}
              >
                Edit
              </Text>
            </View>
            <View style={styles.checkout__detail_desc}>
              <Text style={styles.checkout__detail_desc_text}>Mr.Goodday</Text>
              <Text style={styles.checkout__detail_desc_sub_text}>
                174 Oom Noi, Samut Sakorn, Thailand 74130
              </Text>
            </View>
          </View>
          <View style={styles.checkout__detail}>
            <View style={styles.checkout__detail_header}>
              <Text style={styles.checkout__detail_header_title}>Email address</Text>
              <Text
                style={styles.checkout__detail_header_right}
                onPress={() => this.setState({ emailEditDialogVisible: true })}
              >
                Edit
              </Text>
            </View>
            <View style={styles.checkout__detail_desc}>
              <Text style={styles.checkout__detail_desc_text}>{email}</Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <FlatList data={cartData} renderItem={this.renderProductItem} />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footer__detail}>
            <Text>
              Total Price: <Text style={{ color: "#FF0000", fontWeight: "bold" }}>฿1000.00</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.footer__checkoutButton}
            onPress={() => navigate("PaymentPending")}
          >
            <Text style={styles.footer__checkoutButton_text}>Order Now!</Text>
          </TouchableOpacity>
        </View>

        <DialogInput
          isDialogVisible={emailEditDialogVisible}
          title={"Change Email address"}
          message={"Please enter your email address"}
          hintInput={"Email address"}
          submitInput={inputText => {
            this.setState({ email: inputText, emailEditDialogVisible: false });
          }}
          closeDialog={() => {
            this.setState({ emailEditDialogVisible: false });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8"
  },
  checkout__detail: {
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8",
    padding: 20,
    backgroundColor: "#FFFFFF"
  },
  checkout__detail_header: { flexDirection: "row", marginBottom: 20 },
  checkout__detail_header_title: { flex: 1, color: "#808080" },
  checkout__detail_header_right: {
    textDecorationLine: "underline",
    color: "#FF0000",
    fontSize: 12
  },
  checkout__detail_desc: {},
  checkout__detail_desc_text: {},
  checkout__detail_desc_sub_text: { fontSize: 12, color: "#404040", marginTop: 5 },
  productItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FFFFFF",
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
    flexDirection: "row",
    height: 24
  },

  productItem__udQty_text: {
    height: 24,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center"
  },
  footer: { backgroundColor: "#FFFFFF", flexDirection: "row" },
  footer__detail: { padding: 10, flex: 1, justifyContent: "center", alignItems: "flex-end" },
  footer__checkoutButton: {
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    height: 60
  },
  footer__checkoutButton_text: { color: "#FFFFFF", fontWeight: "bold" }
});

export default CheckoutScreen;
