import React, { Component } from "react";

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  StyleSheet
} from "react-native";
import { Constants, BarCodeScanner, Permissions } from "expo";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StyleProvider } from "native-base";

class ConfirmPaymentScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Confirm Payment",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <ScrollView style={styles.regis__form}>
              <Text style={styles.regis__message}>Confirm your Payment</Text>

              <Text style={styles.regis__sub_message}>Enter your Information</Text>

              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Payment slip <Text style={styles.red}>*</Text>
                </Text>
                <TouchableOpacity style={styles.image_selector}>
                  <Text>Select image</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.coupon__form_submit}
                onPress={() => {
                  navigate("RegisterDone");
                }}
              >
                <Text style={styles.coupon__form_submit_text}>Confirm</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  red: {
    color: "#FF0000"
  },
  wrapper: {
    flex: 1,
    height: "100%",
    padding: 30,
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 90
  },
  logo__image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  regis__form: {
    width: "100%"
  },
  regis__form_control: {},
  regis__label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#555555"
  },
  regis__field: {
    borderColor: "#b9b8b9",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  regis__icon: {
    alignItems: "center",
    marginBottom: 20
  },
  regis__message: {
    marginBottom: 10,
    color: "#FF0000",
    fontSize: 20,
    fontWeight: "bold"
  },
  regis__sub_message: {
    marginBottom: 10,
    fontWeight: "bold"
  },

  image_selector: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#b9b8b9",
    borderStyle: "dashed",
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    color: "#b9b8b9"
  },

  coupon__form_submit: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#da3b32",
    borderBottomWidth: 5,
    borderBottomColor: "#b63029"
  },
  coupon__form_submit_text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  footer: {
    flex: 0,
    padding: 30
  }
});

export default ConfirmPaymentScreen;
