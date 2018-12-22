import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeRewardEarnedModal } from "../actions/modalAction";

class RewardEarnedModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.giftBox}>
          <View style={styles.giftBox_top}>
            <Image
              style={styles.giftBox_top__image}
              source={require("../assets/gift_box_openned_top.png")}
            />
          </View>
          <View style={styles.giftBox_greeting}>
            <Text style={styles.giftBox_greeting__text}>
              Congratulation{"\n"}You get gift voucher.
            </Text>
          </View>
          <View style={styles.giftBox_bottom}>
            <Image
              style={styles.giftBox_bottom__image}
              source={require("../assets/gift_box_openned_bottom.png")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  giftBox: {
    alignItems: "center",
    flex: 0,
    width: "100%"
  },
  giftBox_top: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  giftBox_top__image: {
    width: 200,
    height: 80,

    resizeMode: "contain"
  },
  giftBox_bottom: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  giftBox_bottom__image: {
    width: 200,
    height: 110,
    resizeMode: "contain"
  },
  giftBox_greeting: {},
  giftBox_greeting__text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF"
  }
});
const mapStateToProps = state => ({
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ closeRewardEarnedModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardEarnedModal);
