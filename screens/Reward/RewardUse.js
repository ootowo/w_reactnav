import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HeaderTitle from "../../components/HeaderTitle";
import Barcode from "react-native-barcode-builder";
import { Feather, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

class RewardUseScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="reward" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.header__text}>สแกนเพื่อรับคูปอง</Text>
            <MaterialCommunityIcons name="barcode-scan" style={{ fontSize: 40, marginLeft: 10 }} />
          </View>
          <View style={styles.barcode}>
            <View style={styles.barcode__used}>
              <Text style={styles.barcode__used_text}>USED</Text>
            </View>
            <Barcode value="012345678912" format="EAN13" text="012345678912" flat />
          </View>

          <View style={styles.notes}>
            <Text style={styles.notes__text}>
              สแกนเพื่อรับคูปองมูลค่า 100 บาท{"\n"}ใช้ได้ถึง 07 พฤษภาคม 2561
            </Text>
          </View>
          <View style={styles.userDetailList}>
            <View style={styles.userDetailItem}>
              <View style={styles.userDetailItem__icon}>
                <Feather name="user" style={{ color: "#999999", fontSize: 20 }} />
              </View>
              <Text style={styles.userDetailItem__text}>จงกล โรจนสิทธิศักดิ์</Text>
            </View>
            <View style={styles.userDetailItem}>
              <View style={styles.userDetailItem__icon}>
                <EvilIcons name="credit-card" style={{ color: "#999999", fontSize: 20 }} />
              </View>
              <Text style={styles.userDetailItem__text}>006000935900</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButton__text}>ปิด</Text>
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20
  },
  header__text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  barcode: {
    marginHorizontal: 30
  },
  barcode__used: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    top: 26,
    paddingVertical: 10,
    left: 0,
    backgroundColor: "#FF0000",
    zIndex: 99
  },
  barcode__used_text: {
    fontSize: 40,
    color: "#FFFFFF"
  },
  notes: { alignItems: "center", marginVertical: 20 },
  notes__text: {
    fontSize: 12,
    textAlign: "center"
  },
  userDetailList: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  userDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#F8F8F8",
    borderBottomWidth: 1
  },
  userDetailItem__icon: { marginRight: 10 },
  userDetailItem__text: { fontSize: 14 },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#FF0000"
  },
  closeButton__text: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16
  }
});

export default RewardUseScreen;
