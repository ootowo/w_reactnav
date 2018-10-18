import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";
import Barcode from "react-native-barcode-builder";

import { isEmpty } from "../utils/validate";
import { closeCouponModal } from "../actions/modalAction";

class CouponUsageModal extends Component {
  constructor(props) {
    super(props);
  }

  renderCoupon() {
    const item = this.props.modal.coupon.data;
    const expireDate = moment(item.expireDate, "DD/MM/YYYY");
    const expired = expireDate < Date.now();
    return (
      <View
        style={[
          styles.couponItem,
          expireDate < Date.now() ? styles.couponItem_expired : null
        ]}
      >
        <View style={styles.couponItem__detail}>
          {!isEmpty(item.name.trim()) ? (
            <Text style={styles.couponItem__detail_offertitle}>
              {item.name}
            </Text>
          ) : null}
          <Text style={styles.couponItem__detail_offerdetail}>
            {item.description}
          </Text>
          <Text
            style={[
              styles.couponItem__detail_offerexpire,
              expired
                ? styles.couponItem__detail_offerexpired
                : styles.couponItem__detail_offernotexpire
            ]}
          >
            {expired
              ? "Expired"
              : "Expire on " + expireDate.format("DD MMMM YYYY")}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const { data } = this.props.modal.coupon;
    const expireDate = moment(data.expireDate, "DD/MM/YYYY");
    const expired = expireDate < Date.now();

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.detail}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.closeCouponModal()}
          >
            <EvilIcons name="close" size={25} color="#000000" />
          </TouchableOpacity>
          {/* <View style={styles.usedAlert}>
            <Text style={styles.usedAlert__text}>
              You're already used this coupon on 31 September 2018 at Bangbon
              Branch
            </Text>
          </View> */}
          <View style={styles.couponPreview}>{this.renderCoupon()}</View>
          <View style={styles.couponImage}>
            <Image
              style={styles.couponImage__image}
              source={{
                uri: data.imagePath
              }}
            />
          </View>
          <View style={styles.barcodeViewer}>
            <Barcode value={data.code} format="CODE128" text={data.code} />
            <Text style={styles.barcodeViewer__note}>
              Please show this barcode with sale for usage this coupon
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.props.closeCouponModal()}
          >
            <Text style={styles.submitButton__text}>Change to Used</Text>
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
    height: 260,
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
    height: 180,
    backgroundColor: "#FFFFFF",
    padding: 10,
    flexDirection: "column"
  },
  barcodeViewer__image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain"
  },
  barcodeViewer__note: {
    flex: 0,
    fontSize: 10,
    color: "#a4a4a4",
    marginTop: 10,
    textAlign: "center"
  },
  couponPreview: {},
  couponItem: {
    width: "100%",
    height: 100,
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
    fontSize: 34,
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
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeCouponModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponUsageModal);
