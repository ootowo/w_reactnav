import { FormattedMessage } from "react-intl";
import { Text } from "react-native";
import React, { Component } from "react";

class HeaderTitle extends Component {
  render() {
    return (
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        <FormattedMessage id={this.props.id} />
      </Text>
    );
  }
}

export default HeaderTitle;
