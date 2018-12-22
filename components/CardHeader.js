import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openCardPreviewModal } from "../actions/modalAction";

class CardHeader extends Component {
  render() {
    const isFacebook = this.props.user.user.facebook_access_token !== null;

    if (!isFacebook) {
      return (
        <TouchableOpacity style={styles.card} onPress={() => this.props.openCardPreviewModal()}>
          <Image style={styles.card__image} source={require("../assets/card_thumbnail/card.png")} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  card: {
    width: 55,
    height: 35,
    marginRight: 10
  },
  card__image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  }
});

const mapStateToProps = state => ({
  modal: state.modalReducer,
  user: state.userReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ openCardPreviewModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardHeader);
