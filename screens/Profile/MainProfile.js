import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class MainProfileScreen extends Component {
    static navigationOptions = ({ natigation }) => ({
        header: null
    });

    render() {
        return (
            <View style={styles.container}>
                <Text>MainProfileScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default MainProfileScreen;
