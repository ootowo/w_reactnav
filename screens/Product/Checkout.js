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
import { EvilIcons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

class CheckoutScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Checkout",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      cartData: [
        {
          name: "OTTO Powerblender",
          qty: 1,
          price: "1,990",
          special_price: "2,000",
          image: {
            uri:
              "https://img10.jd.co.th/n0/jfs/t13/76/28441736/67525/88369413/5b764e81N1914df9a.jpg!q70.jpg"
          }
        }
      ],
      emailEditDialogVisible: false,
      email: "goodday@gmail.com",
      pickedDate: new Date(),
      dateTimePickerVisible: false
    };

    this.renderProductItem = this.renderProductItem.bind(this);
    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.handleDateTimePicked = this.handleDateTimePicked.bind(this);
  }

  showDateTimePicker() {
    this.setState({ dateTimePickerVisible: true });
  }

  hideDateTimePicker() {
    this.setState({ dateTimePickerVisible: false });
  }

  handleDateTimePicked(date) {
    this.setState({ pickedDate: date });
    this.hideDateTimePicker();
  }

  renderProductItem = ({ item, index }) => (
    <View style={styles.productItem}>
      <Image style={styles.productItem__image} source={item.image} />
      <View style={styles.productItem__detail}>
        <Text style={styles.productItem__detail_name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productItem__detail_price}>${item.special_price}</Text>
        <Text style={styles.productItem__detail_oldprice}>${item.price}</Text>
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
    const {
      cartData,
      emailEditDialogVisible,
      email,
      dateTimePickerVisible,
      pickedDate
    } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {/* <View style={styles.checkout__channel}>
            <Text style={styles.checkout__channel_header}>Delivery Channel</Text>
            <View style={styles.checkout__channel_selector}>
              <TouchableOpacity
                style={[
                  styles.checkout__channel_selector_button,
                  styles.checkout__channel_selector_button__selected
                ]}
              >
                <MaterialCommunityIcons name="truck-delivery" size={40} />
                <Text style={styles.checkout__channel_selector_button_text}>Pick up at store</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkout__channel_selector_button}>
                <FontAwesome name="shopping-cart" size={40} />
                <Text style={styles.checkout__channel_selector_button_text}>Delivery</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* <View style={styles.checkout__detail}>
            <View style={styles.checkout__detail_header}>
              <Text style={styles.checkout__detail_header_title}>Pickup Date</Text>
              <Text style={styles.checkout__detail_header_right} onPress={this.showDateTimePicker}>
                Edit
              </Text>
            </View>
            <View style={styles.checkout__detail_desc}>
              <Text style={styles.checkout__detail_desc_text}>
                {moment(pickedDate).format("DD MMM YYYY HH:mm")}
              </Text>
            </View>
          </View> */}
          <View style={styles.checkout__detail}>
            <View style={styles.checkout__detail_header}>
              <Text style={styles.checkout__detail_header_title}>Pickup Date &amp; Branch</Text>
              <Text
                style={styles.checkout__detail_header_right}
                onPress={() => navigate("PickupSelector")}
              >
                Edit
              </Text>
            </View>
            <View style={styles.checkout__detail_desc}>
              <Text style={styles.checkout__detail_desc_text}>
                {moment(pickedDate).format("DD MMM YYYY HH:mm")}, Makro Siem Reap
              </Text>
            </View>
          </View>
          {/* <View style={styles.checkout__detail}>
            <View style={styles.checkout__detail_header}>
              <Text style={styles.checkout__detail_header_title}>Shipping Address</Text>
              <Text
                style={styles.checkout__detail_header_right}
                onPress={() => navigate("AddressSelector")}
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
          </View> */}
          <View style={styles.checkout__detail}>
            <View style={styles.checkout__detail_header}>
              <Text style={styles.checkout__detail_header_title}>Tax Invoice Address</Text>
              <Text
                style={styles.checkout__detail_header_right}
                onPress={() => navigate("AddressSelector")}
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
              Total Amout: <Text style={{ color: "#FF0000", fontWeight: "bold" }}>$2,000</Text>
            </Text>
            <Text>
              Saving Today: <Text style={{ color: "#FF0000", fontWeight: "bold" }}>$10</Text>
            </Text>
            <Text>
              Net Amount: <Text style={{ color: "#FF0000", fontWeight: "bold" }}>$1,990</Text>
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

        <DateTimePicker
          mode="datetime"
          isVisible={dateTimePickerVisible}
          onConfirm={this.handleDateTimePicked}
          onCancel={this.hideDateTimePicker}
          minuteInterval={5}
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
  checkout__channel: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF"
  },
  checkout__channel_header: { color: "#808080" },
  checkout__channel_selector: { flexDirection: "row", marginTop: 20 },
  checkout__channel_selector_button: {
    width: "50%",
    borderColor: "transparent",
    borderWidth: 4,
    padding: 20,
    alignItems: "center",
    borderRadius: 15
  },
  checkout__channel_selector_button__selected: {
    borderColor: "#FF0000"
  },
  checkout__channel_selector_button_text: {
    marginTop: 10,
    fontWeight: "bold"
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
    height: 70
  },
  footer__checkoutButton_text: { color: "#FFFFFF", fontWeight: "bold" }
});

export default CheckoutScreen;
