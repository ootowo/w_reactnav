import React, { Component } from "react";

import {
  View,
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

class RegisterDoneScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.logo}>
              <Image source={require("../assets/makro_cam_logo.png")} style={styles.logo__image} />
            </View>
            <View style={styles.regis__form}>
              <View style={styles.regis__icon}>
                <Ionicons name="ios-checkmark-circle" size={52} color="#4ca64c" />
              </View>
              <Text style={styles.regis__message}>Thanks for Registration</Text>
              <Text style={styles.regis__sub_message}>
                Congratulations, You're already registrated successfully.
              </Text>
              <TouchableOpacity
                style={styles.coupon__form_submit}
                onPress={() => {
                  navigate("Main");
                }}
              >
                <Text style={styles.coupon__form_submit_text}>Shop Now!</Text>
              </TouchableOpacity>
            </View>
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
  wrapper: {
    flex: 1,
    height: "100%",
    margin: 30,
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
    width: "100%",
    marginTop: 40
  },
  regis__icon: {
    alignItems: "center",
    marginBottom: 20
  },
  regis__message: {
    marginBottom: 10,
    color: "#4ca64c",
    fontWeight: "bold",
    textAlign: "center"
  },
  regis__sub_message: {
    marginBottom: 10,
    textAlign: "center"
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

export default RegisterDoneScreen;
