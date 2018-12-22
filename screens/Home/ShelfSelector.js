import React, { Component } from "react";

import { View, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { FormattedMessage } from "react-intl";

import { makeConfigAsync } from "../../actions/settingAction";

class ShelfSelectorScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <FormattedMessage id="setting.shelf" />,
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
    this.state = {
      shelfs: [
        {
          id: 0,
          style_id: 1,
          file: require("../../assets/shelfs/shelf_style_1/preview/shelf.png")
        },
        // {
        //   id: 1,
        //   style_id: 2,
        //   file: require("../../assets/shelfs/shelf_style_2/preview/shelf.png")
        // },
        {
          id: 1,
          style_id: 2,
          file: require("../../assets/shelfs/shelf_style_3/preview/shelf.png")
        },
        {
          id: 2,
          style_id: 3,
          file: require("../../assets/shelfs/shelf_style_4/preview/shelf.png")
        },
        {
          id: 3,
          style_id: 4,
          file: require("../../assets/shelfs/shelf_style_5/preview/shelf.png")
        }
      ]
    };

    this.renderShelfItem = this.renderShelfItem.bind(this);
    this.setShelfStyle = this.setShelfStyle.bind(this);
  }

  setShelfStyle = id => {
    this.setState({ selectedShelf: id });
    const oldSetting = this.props.setting.params;
    new Promise((resolve, reject) => {
      this.props.makeConfigAsync({ key: "shelf", value: id, oldSetting }, resolve, reject);
    })
      .then(success => {})
      .catch(error => {
        Alert.alert("error", JSON.stringify({ key: "shelf", error }));
      });
  };

  renderShelfItem = (item, key) => {
    const stylePath = `../../assets/shelfs/shelf_style_1/preview/shelf.png`;
    const { setting } = this.props;
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.shelfItem}
        onPress={() => this.setShelfStyle(item.style_id)}
      >
        {item.style_id == setting.params.shelf ? (
          <View style={styles.shelfItem__check}>
            <Ionicons name="ios-checkmark" size={32} color="#FFFFFF" />
          </View>
        ) : null}
        <View
          style={[
            styles.shelfItem__overlay,
            item.style_id == setting.params.shelf ? styles.shelfItem__overlay_selected : null
          ]}
        >
          <Image style={styles.shelfItem__image} source={item.file} />
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.shelfList}>
          {this.state.shelfs.map(this.renderShelfItem)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  shelfList: {
    flex: 1,
    padding: 10
  },
  shelfItem: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    padding: 13
  },
  shelfItem__overlay: {
    width: "100%",
    height: "100%",
    paddingTop: 30
  },
  shelfItem__overlay_selected: {
    borderWidth: 3,
    borderColor: "#FF0000",
    borderRadius: 15
  },
  shelfItem__check: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 999
  },
  shelfItem__image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});

const mapStateToProps = state => ({
  setting: state.settingReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ makeConfigAsync }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShelfSelectorScreen);
