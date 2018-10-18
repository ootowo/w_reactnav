import React, { Component } from "react";
import { Header } from "react-navigation";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView
} from "react-native";

import styles from "../styles";

class ProfileHeader extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.header.headerProfile}
        onPress={() => navigate("Profile")}
      >
        <View style={styles.header.headerProfile__profileImage}>
          <Image
            style={styles.header.headerProfile__profileImage_image}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBapT6eBUt5RFRTxWPwztndojMWqgwoLLxD1lCwhUJ834nLXSk"
            }}
          />
        </View>
        <Text style={styles.header.headerProfile__profileName}>
          Welcome Bryan Cool
        </Text>
      </TouchableOpacity>
    );
  }
}

export default ProfileHeader;
