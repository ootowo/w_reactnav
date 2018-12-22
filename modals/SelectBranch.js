import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";

import { closeSelectBranchModal } from "../actions/modalAction";
import { makeConfigAsync } from "../actions/settingAction";
import branches from "../utils/branches";

class SelectBranchModal extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      loading: false,
      selectedBranch: undefined,
      branches: []
    };
    this.submitBranch = this.submitBranch.bind(this);
  }

  componentDidMount() {
    const lang = this.props.setting.params.language;
    const branchesDDL = branches[lang].map(branch => {
      return { label: branch.name, value: branch.id };
    });
    this.setState({ branches: branchesDDL });
  }

  submitBranch() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      if (this.state.selectedBranch != undefined) {
        new Promise((resolve, reject) => {
          this.props.makeConfigAsync(
            {
              key: "branch",
              value: this.state.selectedBranch,
              oldSetting: this.props.setting.params
            },
            resolve,
            reject
          );
        }).then(() => {
          this.setState({ loading: false });
          this.props.closeSelectBranchModal();
        });
      }
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.body}>
            <Text style={styles.title}>
              <FormattedMessage id="selectbranch" />
            </Text>
            <View style={{ width: "100%", marginTop: 20 }}>
              <FormattedMessage id="branch">
                {msg => (
                  <RNPickerSelect
                    style={{ ...pickerStyles }}
                    placeholder={{ label: msg, value: null }}
                    items={this.state.branches}
                    onValueChange={value => {
                      this.setState({ selectedBranch: value });
                    }}
                    value={this.state.selectedBranch}
                    ref={el => {
                      this.inputRefs.branchPicker = el;
                    }}
                  />
                )}
              </FormattedMessage>
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={this.submitBranch}>
            <Text style={styles.submitButton__text}>
              {loading ? (
                <FormattedMessage id="loading" />
              ) : (
                <FormattedMessage id="selectbranch.submit" />
              )}
            </Text>
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
  modal: state.modalReducer,
  setting: state.settingReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeSelectBranchModal, makeConfigAsync }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBranchModal);
