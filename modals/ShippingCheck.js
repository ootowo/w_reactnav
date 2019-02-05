import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeShippingCheckModal } from "../actions/modalAction";

class ShippingCheckModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dialog}>
          <View style={styles.shipping_form}>
            <Text style={styles.title}>Please select your address</Text>
            <Text style={styles.sub_title}>For helping you to shopping and shipping</Text>
            <TextInput style={styles.text__field} placeholder="Province" />
            <TextInput style={styles.text__field} placeholder="District" />
            <TextInput style={styles.text__field} placeholder="Sub-District" />
            <TextInput style={styles.text__field} placeholder="Zip Code" />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.props.closeShippingCheckModal()}
          >
            <Text style={styles.submitButton__text}>Set your address</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  dialog: {
    width: "90%"
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },
  sub_title: {
    textAlign: "center",
    marginBottom: 20
  },
  shipping_form: {
    backgroundColor: "#FFFFFF",
    padding: 20
  },
  text__field: {
    backgroundColor: "#FFFFFF",
    borderColor: "#b9b8b9",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  submitButton: {
    flex: 0,
    padding: 15,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center"
  },
  submitButton__text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});
const mapStateToProps = state => ({
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ closeShippingCheckModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingCheckModal);
