import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Header } from "react-navigation";
import { View, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import React, { Component } from "react";
import { Base64 } from "js-base64";

import { isEmpty } from "../utils/validate";
import styles from "../styles";

class ProfileHeader extends Component {
  render() {
    const { user } = this.props.user;
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.header.headerProfile} onPress={() => navigate("Profile")}>
        <View style={styles.header.headerProfile__profileImage}>
          <Image
            style={styles.header.headerProfile__profileImage_image}
            source={{
              uri: user.picture_path
                ? Base64.decode(user.picture_path)
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBapT6eBUt5RFRTxWPwztndojMWqgwoLLxD1lCwhUJ834nLXSk"
            }}
          />
        </View>
        <View style={styles.header.headerProfile__profileName}>
          <Text style={styles.header.headerProfile__profileName_text}>
            <FormattedMessage id="welcome" /> {!isEmpty(user.name) && user.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer
});
export default connect(mapStateToProps)(ProfileHeader);
