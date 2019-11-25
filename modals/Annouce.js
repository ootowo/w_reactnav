import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import React, { Component } from "react";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";

import { closeAnnouceModal } from "../actions/modalAction";

class AnnouceModal extends Component {
  constructor(props) {
    super(props);
  }

  async onPressOpenWebSite(address) {
    await WebBrowser.openBrowserAsync(address);
  }

  render() {
    const item = this.props.modal.annouce.data;
    const { width } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <View style={styles.popup}>
          <View style={styles.popup__header}>
            <TouchableOpacity
              style={styles.popup__closeButton}
              onPress={() => this.props.closeAnnouceModal()}
            >
              <Ionicons name="ios-close" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.popup__imageContainer} onPress={() => onPressOpenWebSite(item.url)}>
            <Image
              style={[styles.popup__imageContainer_image, { height: width - 40 }]}
              source={{ uri: item.image_url }}
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
  popup: { width: "100%", paddingHorizontal: 20 },
  popup__header: { flex: 0, alignItems: "flex-end", marginBottom: 20 },
  popup__closeButton: {
    backgroundColor: "#FF0000",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  popup__imageContainer: { width: "100%" },
  popup__imageContainer_image: { width: "100%" }
});
const mapStateToProps = state => ({
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ closeAnnouceModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouceModal);
