import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";

class EditShipAddressScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Shipping Address",
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ScrollView style={styles.regis__form}>
            <Text style={styles.regis__sub_message}>Primary Information</Text>
            <View style={styles.regis__form_control}>
              <Text style={styles.regis__label}>
                Name <Text style={styles.red}>*</Text>
              </Text>
              <TextInput style={styles.regis__field} placeholder="Name" />
            </View>

            <Text style={[styles.regis__sub_message, { marginTop: 20 }]}>Shipping Address</Text>
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

            <TouchableOpacity
              style={styles.coupon__form_submit}
              onPress={() => {
                navigate("RegisterDone");
              }}
            >
              <Text style={styles.coupon__form_submit_text}>Save changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  red: {
    color: "#FF0000"
  },
  wrapper: {
    flex: 1,
    height: "100%",
    margin: 20,
    flexDirection: "column",
    alignItems: "center"
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
  }
});

export default EditShipAddressScreen;
