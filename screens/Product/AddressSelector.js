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
import { EvilIcons, MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

class AddressSelectorScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Address",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      addressData: [
        {
          selected: false,
          name: "Mr. Goodday",
          address: "174 Oom Noi, Samut Sakorn, Thailand 74130"
        },
        {
          selected: true,
          name: "Mr. Goodday",
          address: "174 Oom Noi, Samut Sakorn, Thailand 74130"
        }
      ]
    };

    this.renderProductItem = this.renderAddressItem.bind(this);
  }

  renderAddressItem = ({ item, index }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressItem__radio}>
        {item.selected ? (
          <Ionicons name="md-radio-button-on" size={20} color="#FF0000" />
        ) : (
          <Ionicons name="md-radio-button-off" size={20} color="#CCCCCC" />
        )}
      </View>
      <View style={styles.addressItem__detail_desc}>
        <Text style={styles.addressItem__detail_desc_text}>{item.name}</Text>
        <Text style={styles.addressItem__detail_desc_sub_text}>{item.address}</Text>
      </View>
    </View>
  );

  render() {
    const { addressData } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <FlatList data={addressData} renderItem={this.renderAddressItem} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footer__addButton}
            onPress={() => navigate("EditShipAddress")}
          >
            <Text style={styles.footer__addButton_text}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8"
  },
  addressItem: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8"
  },
  addressItem__radio: {
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  addressItem__detail: {
    padding: 20,
    backgroundColor: "#FFFFFF"
  },
  addressItem__detail_header: { flexDirection: "row", marginBottom: 20 },
  addressItem__detail_header_title: { flex: 1, color: "#808080" },
  addressItem__detail_header_right: {
    textDecorationLine: "underline",
    color: "#FF0000",
    fontSize: 12
  },
  addressItem__detail_desc: {},
  addressItem__detail_desc_text: {},
  addressItem__detail_desc_sub_text: { fontSize: 12, color: "#404040", marginTop: 5 },
  footer: { backgroundColor: "#FFFFFF" },
  footer__addButton: {
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    height: 60
  },
  footer__addButton_text: { color: "#FFFFFF", fontWeight: "bold" }
});

export default AddressSelectorScreen;
