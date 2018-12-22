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

class RegisterScreen extends Component {
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
            <ScrollView style={styles.regis__form}>
              <Text style={styles.regis__message}>Register</Text>

              <Text style={styles.regis__sub_message}>Primary Information</Text>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Branch to Apply <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Please Select Branch" />
              </View>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Type of Member <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Please Select Type of Member" />
              </View>

              <Text style={[styles.regis__sub_message, { marginTop: 20 }]}>
                Authorized Card Holder (1)
              </Text>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  In English <Text style={styles.red}>*</Text>
                </Text>
                <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
                  <View style={[styles.regis__form_control, { width: "48%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Name" />
                  </View>
                  <View style={[styles.regis__form_control, { marginLeft: 5, width: "50%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Surname" />
                  </View>
                </View>
              </View>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  In Cambodia <Text style={styles.red}>*</Text>
                </Text>
                <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
                  <View style={[styles.regis__form_control, { width: "48%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Name" />
                  </View>
                  <View style={[styles.regis__form_control, { marginLeft: 5, width: "50%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Surname" />
                  </View>
                </View>
              </View>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Passport No <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Passport No" />
              </View>

              <Text style={[styles.regis__sub_message, { marginTop: 20 }]}>Registered address</Text>
              <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
                <View style={[styles.regis__form_control, { width: "48%" }]}>
                  <Text style={styles.regis__label}>
                    Sangkat <Text style={styles.red}>*</Text>
                  </Text>
                  <TextInput style={styles.regis__field} placeholder="Sangkat" />
                </View>
                <View style={[styles.regis__form_control, { marginLeft: 5, width: "50%" }]}>
                  <Text style={styles.regis__label}>Khan</Text>
                  <TextInput style={styles.regis__field} placeholder="Khan" />
                </View>
              </View>

              <View style={styles.regis__form_control}>
                <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
                  <View style={[styles.regis__form_control, { width: "48%" }]}>
                    <Text style={styles.regis__label}>Phoum</Text>
                    <TextInput style={styles.regis__field} placeholder="Phoum" />
                  </View>

                  <View style={[styles.regis__form_control, { marginLeft: 5, width: "50%" }]}>
                    <Text style={styles.regis__label}>Khum</Text>
                    <TextInput style={styles.regis__field} placeholder="Khum" />
                  </View>
                </View>
              </View>

              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Srok <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Srok" />
              </View>

              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Khet <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Khet" />
              </View>

              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Zip Code <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Zip Code" />
              </View>

              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Telephone <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Telephone" />
              </View>

              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Mobile Phone <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Mobile Phone" />
              </View>

              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  E-Mail address <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="E-Mail address" />
              </View>

              <Text style={[styles.regis__sub_message, { marginTop: 20 }]}>
                Authorized Card Holder (2)
              </Text>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  In English <Text style={styles.red}>*</Text>
                </Text>
                <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
                  <View style={[styles.regis__form_control, { width: "48%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Name" />
                  </View>
                  <View style={[styles.regis__form_control, { marginLeft: 5, width: "50%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Surname" />
                  </View>
                </View>
              </View>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  In Cambodia <Text style={styles.red}>*</Text>
                </Text>
                <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
                  <View style={[styles.regis__form_control, { width: "48%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Name" />
                  </View>
                  <View style={[styles.regis__form_control, { marginLeft: 5, width: "50%" }]}>
                    <TextInput style={styles.regis__field} placeholder="Surname" />
                  </View>
                </View>
              </View>
              <View style={styles.regis__form_control}>
                <Text style={styles.regis__label}>
                  Passport No <Text style={styles.red}>*</Text>
                </Text>
                <TextInput style={styles.regis__field} placeholder="Passport No" />
              </View>

              <TouchableOpacity
                style={styles.coupon__form_submit}
                onPress={() => {
                  navigate("RegisterDone");
                }}
              >
                <Text style={styles.coupon__form_submit_text}>Register</Text>
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

export default RegisterScreen;
