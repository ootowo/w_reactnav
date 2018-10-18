import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RNPickerSelect from "react-native-picker-select";

import { closeSelectBranchModal } from "../actions/modalAction";

class SelectBranchModal extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      selectedSector: undefined,
      sectors: [
        { label: "Bangkok", value: "bangkok" },
        { label: "Central", value: "central" },
        { label: "North", value: "north" },
        { label: "South", value: "south" },
        { label: "North East", value: "north-east" }
      ],
      selectedBranch: undefined,
      branches: [
        { label: "Bangkok", value: "bangkok" },
        { label: "Central", value: "central" },
        { label: "North", value: "north" },
        { label: "South", value: "south" },
        { label: "North East", value: "north-east" }
      ]
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.body}>
            <Text style={styles.title}>Please Choose Branch</Text>
            <View style={{ width: "100%", marginTop: 20 }}>
              <RNPickerSelect
                style={{ ...pickerStyles }}
                placeholder={{ label: "Branch", value: null }}
                items={this.state.branches}
                onValueChange={value => {
                  this.setState({ selectedBranch: value });
                }}
                value={this.state.selectedBranch}
                ref={el => {
                  this.inputRefs.branchPicker = el;
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.props.closeSelectBranchModal()}
          >
            <Text style={styles.submitButton__text}>Choose Branch</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center"
  },
  wrapper: {
    width: "80%",
    flex: 0,
    backgroundColor: "#f8f8f8"
  },
  body: {
    padding: 20,
    alignItems: "center"
  },
  title: {
    flex: 0,
    fontSize: 15
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
const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#FFFFFF",
    flex: 0,
    width: "100%"
  },
  inputAndroid: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#FFFFFF",
    flex: 0,
    width: "100%"
  },
  icon: {
    top: 20,
    right: 15,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderLeftWidth: 6,
    borderTopColor: "#999999"
  }
});

const mapStateToProps = state => ({
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeSelectBranchModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBranchModal);
