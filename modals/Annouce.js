import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "react-native";
import React, { Component } from "react";

import { closeAnnouceModal } from "../actions/modalAction";

class AnnouceModal extends Component {
  render() {
    return <View />;
  }
}

const mapStateToProps = state => ({
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ closeAnnouceModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouceModal);
