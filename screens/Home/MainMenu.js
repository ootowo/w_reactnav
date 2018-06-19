import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Constants, WebBrowser } from "expo";
import { bindActionCreators } from "redux";

import { openSocialModal } from "../../actions/modalAction";
import ProfileHeader from "../../components/ProfileHeader";

class MainMenuScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <ProfileHeader />
    });

    constructor(props) {
        super(props);
    }

    async onPressOpenWebSite() {
        await WebBrowser.openBrowserAsync("https://www.makroclick.com");
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <Grid>
                    <Col>
                        <Row>
                            <Button rounded onPress={() => navigate("Coupon")}>
                                <Text>Coupon</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button
                                rounded
                                onPress={() => navigate("Privillage")}
                            >
                                <Text>Privillage</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button
                                rounded
                                onPress={this.props.openSocialModal}
                            >
                                <Text>Social Networks</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button rounded onPress={() => navigate("Setting")}>
                                <Text>Settings</Text>
                            </Button>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Button rounded onPress={() => navigate("Mail")}>
                                <Text>Makro Mails</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button rounded onPress={() => navigate("News")}>
                                <Text>News and Activity</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button rounded onPress={this.onPressOpenWebSite}>
                                <Text>Makro Click!</Text>
                            </Button>
                        </Row>
                        <Row />
                    </Col>
                    <Col>
                        <Row>
                            <Button
                                rounded
                                onPress={() => navigate("ProductCatalog")}
                            >
                                <Text>Catalog</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button
                                rounded
                                onPress={() => navigate("Entertainment")}
                            >
                                <Text>Entertainment</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button rounded onPress={() => navigate("Offer")}>
                                <Text>Today Offering</Text>
                            </Button>
                        </Row>
                        <Row />
                    </Col>
                </Grid>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF"
    }
});

const mapStateToProps = state => ({
    modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ openSocialModal }, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenuScreen);
