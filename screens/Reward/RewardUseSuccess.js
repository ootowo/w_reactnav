import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HeaderTitle from "../../components/HeaderTitle";
import Barcode from "react-native-barcode-builder";
import { EvilIcons } from "@expo/vector-icons";

class RewardUseSuccessScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="reward" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.successMsg}>
            <EvilIcons
              name="check"
              style={{ fontSize: 60, marginVertical: 40, color: "#66b266" }}
            />
            <Text style={styles.successMsg__header}>Thank you</Text>
            <Text style={styles.successMsg__note}>You've redeem reward successfully</Text>
            <Text style={styles.successMsg__note_2}>
              Check your redeem information from "My Coupon"
            </Text>
          </View>
          <TouchableOpacity style={styles.myCouponButton}>
            <Text style={styles.myCouponButton__text}>My Coupon</Text>
          </TouchableOpacity>
          <View style={styles.form__seperator}>
            <View style={styles.form__seperator_line} />
            <Text style={styles.form__seperator_text}>OR</Text>
          </View>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButton__text}>Back</Text>
          </TouchableOpacity>
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
  successMsg: {
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  successMsg__header: {
    color: "#66b266",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5
  },
  successMsg__note: { fontSize: 15, marginBottom: 40, fontWeight: "bold" },
  successMsg__note_2: { fontSize: 14, marginBottom: 5 },
  form__seperator: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: 40
  },
  form__seperator_line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    position: "absolute",
    top: "50%" - 1
  },
  form__seperator_text: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10
  },
  myCouponButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 40,
    backgroundColor: "#FF0000"
  },
  myCouponButton__text: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 40,
    backgroundColor: "transparent",
    borderColor: "#FF0000",
    borderWidth: 1
  },
  closeButton__text: {
    fontWeight: "bold",
    color: "#FF0000",
    fontSize: 16
  }
});

export default RewardUseSuccessScreen;
