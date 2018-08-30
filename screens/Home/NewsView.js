import React, { Component } from "react";
import { View, ScrollView, WebView, StyleSheet, SafeAreaView, Dimensions, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Root, Header, Left, Body, Right, Button, Icon, Title, ActionSheet } from "native-base";
import HeaderButtons, { HeaderButton, Item } from "react-navigation-header-buttons";

class NewsView extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    constructor(props) {
        super(props);
        this.state = {
            FONT_BUTTONS: ["ปกติ", "กลาง", "ใหญ่", "ok"],
            FONT_CANCEL_INDEX: 3,
            SHARE_BUTTONS: ["Facebook", "Twitter", "ok"],
            SHARE_CANCEL_INDEX: 2
        };
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Root>
                <View style={styles.container}>
                    <Header>
                        <Left style={{ flexDirection: "row", alignItems: "center" }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="arrow-back" style={{ color: "#000000" }} />
                            </Button>
                            <Title>ข่าวสารล่าสุด</Title>
                        </Left>
                        <Right style={{ flex: 0 }}>
                            <Button
                                transparent
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: this.state.FONT_BUTTONS,
                                            cancelButtonIndex: this.state.FONT_CANCEL_INDEX,
                                            title: "ขนาดอักษร"
                                        },
                                        buttonIndex => {
                                            this.setState({ clicked: this.state.FONT_BUTTONS[buttonIndex] });
                                        }
                                    )
                                }
                            >
                                <Icon type="Octicons" name="text-size" style={{ color: "#000000", fontSize: 18 }} />
                            </Button>
                            <Button
                                transparent
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: this.state.SHARE_BUTTONS,
                                            cancelButtonIndex: this.state.SHARE_CANCEL_INDEX,
                                            title: "Share"
                                        },
                                        buttonIndex => {
                                            this.setState({ clicked: this.state.SHARE_BUTTONS[buttonIndex] });
                                        }
                                    )
                                }
                            >
                                <Icon type="Entypo" name="share" style={{ color: "#000000", fontSize: 18 }} />
                            </Button>
                        </Right>
                    </Header>
                    <ScrollView style={styles.wrapper}>
                        <WebView
                            style={{
                                flex: 1,
                                width: Dimensions.get("window").width,
                                height: Dimensions.get("window").height
                            }}
                            source={{ uri: "https://www.google.com" }}
                        />
                    </ScrollView>
                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    wrapper: {
        padding: 10
    }
});

export default NewsView;
