import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
    StyleSheet
} from "react-native";
import { Constants, BarCodeScanner, Permissions } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: false,
            showScannerModal: false
        };
        this._requestCameraPermission = this._requestCameraPermission.bind(this);
        this.handleBarcodeReaded = this.handleBarcodeReaded.bind(this);
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted"
        });
    };

    handleBarcodeReaded(data) {
        console.log(JSON.stringify(data));
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={styles.logo}>
                            <Image source={require("../assets/makro_logo.png")} style={styles.logo__image} />
                        </View>
                        <View style={styles.login__form}>
                            <Text style={styles.login__message}>Makro Member, Please Sanner Barcode for Login</Text>
                            <TouchableOpacity
                                style={styles.coupon__scanner_button}
                                onPress={() => this.setState({ showScannerModal: true })}
                            >
                                <MaterialCommunityIcons
                                    style={styles.coupon__scanner_button_icon}
                                    name="barcode-scan"
                                    size={20}
                                    color="#FFFFFF"
                                />
                                <Text style={styles.coupon__scanner_button_text}>Barcode Scan</Text>
                            </TouchableOpacity>
                            <View style={styles.form__seperator}>
                                <View style={styles.form__seperator_line} />
                                <Text style={styles.form__seperator_text}>Or enter member id</Text>
                            </View>
                            <TextInput style={styles.cardid__field} placeholder="Member Card ID" />
                            <TouchableOpacity
                                style={styles.coupon__form_submit}
                                onPress={() => {
                                    navigate("Main");
                                }}
                            >
                                <Text style={styles.coupon__form_submit_text}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.facebook__login_button}>
                            <MaterialCommunityIcons
                                style={styles.facebook__login_button_icon}
                                name="facebook-box"
                                size={20}
                                color="#FFFFFF"
                            />
                            <Text style={styles.facebook__login_button_text}>Login with Facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={this.state.showScannerModal}>
                        <BarCodeScanner style={{ flex: 1 }} onBarCodeRead={this.handleBarcodeReaded} />
                    </Modal>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff"
    },
    wrapper: {
        flex: 1,
        height: "100%",
        margin: 30,
        flexDirection: "column",
        alignItems: "center"
    },
    logo: {
        width: 200,
        height: 50
    },
    logo__image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    login__form: {
        width: "100%",
        marginTop: 40
    },
    login__message: {
        marginBottom: 10
    },
    form__seperator: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    form__seperator_line: {
        width: "100%",
        borderBottomWidth: 3,
        borderBottomColor: "#9e9fa3",
        position: "absolute",
        top: "50%" - 1
    },
    form__seperator_text: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 40
    },
    coupon__scanner_button: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#3478da"
    },
    coupon__scanner_button_icon: {
        marginRight: 15
    },
    coupon__scanner_button_text: {
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    coupon__form_submit: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#da3b32",
        borderBottomWidth: 5,
        borderBottomColor: "#b63029"
    },
    coupon__form_submit_text: {
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    cardid__field: {
        borderColor: "#b9b8b9",
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlign: "center"
    },
    footer: {
        flex: 0,
        padding: 30
    },
    facebook__login_button: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#415893",
        borderBottomWidth: 5,
        borderBottomColor: "#36487b"
    },
    facebook__login_button_icon: {
        marginRight: 15
    },
    facebook__login_button_text: {
        color: "#FFFFFF",
        fontWeight: "bold"
    }
});

export default LoginScreen;
