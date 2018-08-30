import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Platform, TouchableHighlight, SafeAreaView } from "react-native";
import { Button, Text } from "native-base";
import { BlurView } from "expo";

import { closeSocialModal } from "../actions/modalAction";

import styles from "../styles";

class SocialLinkModal extends Component {
    _renderCloseButton() {
        return (
            <TouchableHighlight
                style={styles.modal.closeButton}
                onPress={this.props.closeSocialModal}
            >
                <Text style={styles.modal.closeButton__text}>Close</Text>
            </TouchableHighlight>
        );
    }
    render() {
        return (
            <View style={styles.modal.container}>
                <View style={styles.modal.wrapper}>
                    <View style={styles.modal.wrapper__body}>
                        <SafeAreaView forceInset={{ top: "always" }} />
                        <Text style={styles.modal.socialPage__header}>
                            Social Media
                        </Text>
                        <View style={styles.modal.socialPage__buttonGroup}>
                            <TouchableHighlight
                                style={[
                                    styles.modal.socialPage__socialButton,
                                    styles.modal
                                        .socialPage__socialButton_facebook
                                ]}
                            >
                                <Text
                                    style={
                                        styles.modal
                                            .socialPage__socialButton__text
                                    }
                                >
                                    Facebook
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={[
                                    styles.modal.socialPage__socialButton,
                                    styles.modal
                                        .socialPage__socialButton_youtube
                                ]}
                            >
                                <Text
                                    style={
                                        styles.modal
                                            .socialPage__socialButton__text
                                    }
                                >
                                    Youtube
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={[
                                    styles.modal.socialPage__socialButton,
                                    styles.modal.socialPage__socialButton_www
                                ]}
                            >
                                <Text
                                    style={
                                        styles.modal
                                            .socialPage__socialButton__text
                                    }
                                >
                                    SiamMakro.co.th
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    {this._renderCloseButton()}
                    <SafeAreaView forceInset={{ bottom: "always" }} />
                </View>
                <BlurView
                    tint="dark"
                    intensity={100}
                    style={styles.modal.blurBgAbsolute}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.modalReducer
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ closeSocialModal }, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialLinkModal);
