import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";

import { closeRewardModal } from "../actions/modalAction";

class RewardUsageModal extends Component {
  constructor(props) {
    super(props);
  }
  renderCoupon() {
    const item = this.props.modal.reward.data;
    return (
      <View
        style={[
          styles.couponItem,
          item.expired ? styles.couponItem_expired : null
        ]}
      >
        {item.image ? (
          <View style={styles.couponItem__thumbnail}>
            <Image
              style={styles.couponItem__thumbnail_image}
              source={item.image}
            />
          </View>
        ) : null}

        <View style={styles.couponItem__detail}>
          <Text style={styles.couponItem__detail_offerdetail}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.couponItem__detail_offerexpire,
              item.expired
                ? styles.couponItem__detail_offerexpired
                : styles.couponItem__detail_offernotexpire
            ]}
          >
            {item.expired ? "Expired" : item.expire}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const { data } = this.props.modal.coupon;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.detail}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.closeRewardModal()}
          >
            <EvilIcons name="close" size={25} color="#000000" />
          </TouchableOpacity>
          <View style={styles.usedAlert}>
            <Text style={styles.usedAlert__text}>
              You're already used this reward on 31 September 2018 at Bangbon
              Branch
            </Text>
          </View>
          <View style={styles.couponPreview}>{this.renderCoupon()}</View>
          <View style={styles.barcodeViewer}>
            <Image
              style={styles.barcodeViewer__image}
              source={{
                uri:
                  "https://worldbarcodes.com/wp-content/assets/sites/20/EAN13-barcode-example.jpg"
              }}
            />
            <Text style={styles.barcodeViewer__note}>
              Please show this barcode with sale for usage this reward
            </Text>
          </View>
        </View>
        {/* <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.props.closeCouponModal()}
          >
            <Text style={styles.submitButton__text}>Change to Used</Text>
          </TouchableOpacity>
        </View> */}
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
    marginTop: 20,
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
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  couponItem__thumbnail_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
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
  bindActionCreators({ closeRewardModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardUsageModal);
