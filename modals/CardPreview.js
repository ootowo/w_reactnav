import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Platform, TouchableHighlight, SafeAreaView } from "react-native";
import { Button, Text } from "native-base";
import { BlurView } from "expo";

import { closeCardPreviewModal } from "../actions/modalAction";

import styles from "../styles";

class CardPreviewModal extends Component {
  _renderCloseButton() {
    return (
      <TouchableHighlight
        style={styles.modal.closeButton}
        onPress={this.props.closeCardPreviewModal}
      >
        <Text style={styles.modal.closeButton__text}>Close</Text>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.modal.container}>
        <View style={styles.modal.wrapper}>
          <View style={styles.modal.wrapper__body}>
            <SafeAreaView forceInset={{ top: "always" }} />
          </View>
          {this._renderCloseButton()}
          <SafeAreaView forceInset={{ bottom: "always" }} />
        </View>
        <BlurView
          tint="dark"
          intensity={100}
          style={styles.modal.blurBgAbsolute}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeCardPreviewModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardPreviewModal);
