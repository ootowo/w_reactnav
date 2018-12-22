import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Octicons, Entypo } from "@expo/vector-icons";
import { Root, ActionSheet } from "native-base";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { changeToSmall, changeToMedium, changeToLarge } from "../actions/fontSizeReducer";

class ShareHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FONT_BUTTONS: ["Small", "Medium", "Large", "Cancel"],
      FONT_CLICKED_INDEX: -1,
      FONT_CANCEL_INDEX: 3,
      SHARE_BUTTONS: ["Facebook", "Twitter", "Cancel"],
      SHARE_CLICKED_INDEX: -1,
      SHARE_CANCEL_INDEX: 2
    };
  }

  render() {
    const { fontSize, share } = this.props;
    const { FONT_BUTTONS, FONT_CANCEL_INDEX, SHARE_BUTTONS, SHARE_CANCEL_INDEX } = this.state;
    return (
      <Root>
        <View style={{ flexDirection: "row" }}>
          {fontSize && (
            <TouchableOpacity
              style={{ marginRight: 15, height: "100%", paddingHorizontal: 5 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: FONT_BUTTONS,
                    cancelButtonIndex: FONT_CANCEL_INDEX,
                    title: "Font Size"
                  },
                  buttonIndex => {
                    switch (buttonIndex) {
                      case 0:
                        this.props.changeToSmall();
                        break;
                      case 1:
                        this.props.changeToMedium();
                        break;
                      case 2:
                        this.props.changeToLarge();
                        break;
                    }
                    this.setState({ FONT_CLICKED_INDEX: buttonIndex });
                  }
                )
              }
            >
              <Octicons name="text-size" style={{ color: "#000000", fontSize: 18 }} />
            </TouchableOpacity>
          )}
          {share && (
            <TouchableOpacity
              style={{ marginRight: 15, height: "100%", paddingHorizontal: 5 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SHARE_BUTTONS,
                    cancelButtonIndex: SHARE_CANCEL_INDEX,
                    title: "Share"
                  },
                  buttonIndex => {
                    this.setState({ SHARE_CLICKED_INDEX: buttonIndex });
                  }
                )
              }
            >
              <Entypo name="share" style={{ color: "#000000", fontSize: 18 }} />
            </TouchableOpacity>
          )}
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row"
  },
  button: {
    height: "100%",
    marginRight: 5,
    paddingHorizontal: 5
  }
});

ShareHeader.defaultProps = {
  fontSize: true,
  share: true
};
ShareHeader.propTypes = {
  fontSize: PropTypes.bool,
  share: PropTypes.bool
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeToLarge, changeToMedium, changeToSmall }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(ShareHeader);
