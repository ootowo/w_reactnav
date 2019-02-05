import { connect } from "react-redux";
import { View, Modal } from "react-native";
import React, { Component } from "react";

import AnnouceModal from "./Annouce";
import CardPreviewModal from "./CardPreview";
import CouponUsageModal from "./CouponUsage";
import RewardUsageModal from "./RewardUsage";
import RewardEarnedModal from "./RewardEarned";
import SelectBranch from "./SelectBranch";
import SocialLinkModal from "./SocialLink";
import CouponRedeemModal from "./CouponRedeem";
import ShippingCheckModal from "./ShippingCheck";

class CoreModal extends Component {
  render() {
    return (
      <View>
        <Modal
          visible={this.props.modal.social}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {}}
        >
          <SocialLinkModal />
        </Modal>
        <Modal
          visible={this.props.modal.coupon.visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {}}
        >
          <CouponUsageModal />
        </Modal>
        <Modal
          visible={this.props.modal.reward.visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {}}
        >
          <RewardUsageModal />
        </Modal>
        <Modal
          visible={this.props.modal.reward_earned.visible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {}}
        >
          <RewardEarnedModal />
        </Modal>
        <Modal
          visible={this.props.modal.annouce.visible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {}}
        >
          <AnnouceModal />
        </Modal>
        <Modal
          visible={this.props.modal.card.visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {}}
        >
          <CardPreviewModal />
        </Modal>
        <Modal
          visible={this.props.modal.selectBranch}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {}}
        >
          <SelectBranch />
        </Modal>
        <Modal
          visible={this.props.modal.coupon_redeem.visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {}}
        >
          <CouponRedeemModal />
        </Modal>
        <Modal
          visible={this.props.modal.shipping_check}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {}}
        >
          <ShippingCheckModal />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modalReducer
});
export default connect(mapStateToProps)(CoreModal);
