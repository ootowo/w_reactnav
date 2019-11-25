import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Base64 } from "js-base64";

import { isEmpty } from "../utils/validate";

class ProfileBar extends Component {
  render() {
    const { user, showSummary, rewardData } = this.props;
    return (
      <View style={styles.profileBar}>
        <View style={styles.profileBar__profile}>
          <View style={styles.profileBar__profile_photo}>
            <Image
              style={{ flex: 1 }}
              source={{
                uri: user.picture_path
                  ? Base64.decode(user.picture_path)
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBapT6eBUt5RFRTxWPwztndojMWqgwoLLxD1lCwhUJ834nLXSk"
              }}
            />
          </View>
          <View style={styles.profileBar__profile_name}>
            <Text style={styles.profileBar__profile_name_text}>
              {!isEmpty(rewardData) && rewardData.memberName}
            </Text>
          </View>
        </View>
        {showSummary && (
          <View style={styles.profileBar__summary}>
            <Text style={styles.profileBar__summary_title}>Total Spending</Text>
            <Text style={styles.profileBar__summary_detail}>
              {!isEmpty(rewardData) ? rewardData.currentPoint : 0} Baht
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE"
  },
  profileBar: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FF0000"
  },
  profileBar__profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  profileBar__profile_photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 5,
    overflow: "hidden"
  },
  profileBar__profile_name: {},
  profileBar__profile_name_text: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 14
  },
  profileBar__summary: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  profileBar__summary_title: {
    fontSize: 12,
    textAlign: "center",
    color: "#FFFFFF"
  },
  profileBar__summary_detail: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  user: state.userReducer
});
export default connect(mapStateToProps)(ProfileBar);
