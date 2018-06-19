import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { MapView } from "expo";

import ProfileHeader from "../../components/ProfileHeader";

class MainBranchScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <ProfileHeader />
    });

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mapView}>
                    <MapView
                        style={styles.mapView__map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    />
                </View>
                <TouchableHighlight style={styles.navigateButton}>
                    <Text style={styles.navigateButton__text}>
                        Navigate to branch
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    mapView: {
        flex: 1,
        width: "100%"
    },
    mapView__map: {
        width: "100%",
        height: "100%"
    },
    navigateButton: {
        flex: 0,
        width: "100%",
        height: 45,
        backgroundColor: "#FF0000",
        alignItems: "center",
        justifyContent: "center"
    },
    navigateButton__text: {
        fontWeight: "bold",
        color: "#FFFFFF"
    }
});

export default MainBranchScreen;
