import React, { Component } from "react";
import {
    AppState,
    View,
    ScrollView,
    Text,
    Dimensions,
    WebView,
    StyleSheet,
    Share,
    TouchableOpacity
} from "react-native";
import { Root, ActionSheet } from "native-base";
import { Ionicons, Octicons, Entypo } from "@expo/vector-icons";

var FONT_BUTTONS = ["ปกติ", "กลาง", "ใหญ่", "ok"],
    FONT_CLICKED_INDEX = -1;
(FONT_CANCEL_INDEX = 3), (SHARE_BUTTONS = ["Facebook", "Twitter", "ok"]), (SHARE_CLICKED_INDEX = -1);
SHARE_CANCEL_INDEX = 2;
class OfferView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Offer View",
        headerBackTitle: null,
        headerTintColor: "#000000",
        headerRight: (
            <Root>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        style={{ marginRight: 25 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: FONT_BUTTONS,
                                    cancelButtonIndex: FONT_CANCEL_INDEX,
                                    title: "ขนาดอักษร"
                                },
                                buttonIndex => {
                                    FONT_CLICKED_INDEX = buttonIndex;
                                }
                            )
                        }
                    >
                        <Octicons name="text-size" style={{ color: "#000000", fontSize: 18 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginRight: 15 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: SHARE_BUTTONS,
                                    cancelButtonIndex: SHARE_CANCEL_INDEX,
                                    title: "Share"
                                },
                                buttonIndex => {
                                    SHARE_CLICKED_INDEX = buttonIndex;
                                }
                            )
                        }
                    >
                        <Entypo name="share" style={{ color: "#000000", fontSize: 18 }} />
                    </TouchableOpacity>
                </View>
            </Root>
        )
    });

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={{
                        flex: 1,
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height
                    }}
                    source={{ uri: "https://www.google.co.th/" }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

export default OfferView;
