import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openCardPreviewModal } from "../actions/modalAction";

class CardHeader extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this.props.openCardPreviewModal()}
      >
        <Image
          style={styles.card__image}
          source={require("../assets/makro_card.png")}
        />
      </TouchableOpacity>
    );
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
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ openCardPreviewModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardHeader);
