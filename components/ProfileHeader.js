import React, { Component } from "react";
import { Header } from "react-navigation";
import { View, Text, SafeAreaView } from "react-native";

import styles from "../styles";

export class ProfileHeader extends Component {
    render() {
        return (
            <View style={styles.header.headerProfile}>
                <View style={styles.header.headerProfile__profileImage} />
                <Text style={styles.header.headerProfile__profileName}>
                    Hello, Thanet Prompinit
                </Text>
            </View>
        );
    }
}

export default ProfileHeader;
