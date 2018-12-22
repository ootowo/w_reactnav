import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EvilIcons } from "@expo/vector-icons";
import { closeCouponRedeemModal } from "../actions/modalAction";

class CouponRedeemModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.detail}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.closeCouponRedeemModal()}
          >
            <EvilIcons name="close" size={25} color="#000000" />
          </TouchableOpacity>

          <View style={styles.couponImage}>
            <Image
              style={styles.couponImage__image}
              source={{ uri: "https://www.siammakro.co.th/images/foodservice.jpg" }}
            />
          </View>
          <View style={styles.barcodeViewer}>
            <Text style={styles.barcodeViewer__title}>เงื่อนไขการใช้คูปอง</Text>
            <Text style={styles.barcodeViewer__note}>
              1. คูปองสามารถใช้ได้ที่แม็คโครทุกสาขา{"\n"}
              2. แสดงคูปองส่วนลดเงินสดก่อนการชำระเงิน{"\n"}
              3. จำกัดการใช้ 1 ใบ ต่อ สินค้า 1 ชิ้น{"\n"}
              4. สงวนสิทธิ์การใช้คูปองที่ไม่สมบูรณ์ฉีกขาด{"\n"}
              5. คูปองนี้ไม่สามารถเปลี่ยนหรือทอนเป็นเงินสดได้{"\n"}
              6. คูปองนี้หมดอายุวันที่ 30 ก.ย. 2554 หรือจนกว่าสินค้าจะหมด{"\n"}
              7. คูปองส่วนลดไม่สามารถใช้ร่วมกับรายการส่งเสริมการขายอื่นได้
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.props.closeCouponRedeemModal()}
          >
            <Text style={styles.submitButton__text}>Redeem this coupon</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  detail: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1
  },
  footer: {
    width: "100%",
    flex: 0
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginBottom: 20
  },
  couponImage: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#FFFFFF"
  },
  couponImage__image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  usedAlert: {
    width: "100%",
    backgroundColor: "#00C29E",
    marginBottom: 20,
    padding: 10
  },
  usedAlert__text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  barcodeViewer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    flexDirection: "column"
  },
  barcodeViewer__image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain"
  },
  barcodeViewer__title: {
    flex: 0,
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
    marginBottom: 5
  },
  barcodeViewer__note: {
    flex: 0,
    fontSize: 14,
    color: "#000000"
  },
  couponPreview: {},
  couponItem: {
    width: "100%",
    borderRadius: 5,
    flexDirection: "row"
  },
  couponItem_expired: {
    opacity: 0.65
  },
  couponItem__thumbnail: {
    flex: 0,
    width: 60,
    paddingLeft: 10,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  couponItem__thumbnail_image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  couponItem__detail: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  couponItem__detail_offertitle: {
    color: "#FF0000",
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center"
  },
  couponItem__detail_offerdetail: {
    fontSize: 14,
    color: "#635F62",
    textAlign: "center"
  },
  couponItem__detail_offerexpire: {
    fontSize: 10,
    marginTop: 5,
    textAlign: "center"
  },
  couponItem__detail_offernotexpire: {
    color: "#B1AFB0"
  },
  couponItem__detail_offerexpired: {
    color: "#FF0000"
  },
  couponItem__sep: {
    width: 14,
    height: 100,
    resizeMode: "contain"
  },
  couponItem__submit: {
    flex: 0,
    width: 80,
    height: 100,
    backgroundColor: "#FF7D7D",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4
  },
  couponItem__submit_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  submitButton__text: {
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});
const mapStateToProps = state => ({
  modal: state.modalReducer,
  setting: state.settingReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ closeCouponRedeemModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponRedeemModal);
