import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Modal } from "react-native";

import SocialLinkModal from "./SocialLink";

class CoreModal extends Component {
    render() {
        return (
            <View>
                <Modal
                    visible={this.props.modal.social}
                    animationType="slide"
                    transparent={true}
                >
                    <SocialLinkModal />
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.modalReducer
});
export default connect(mapStateToProps)(CoreModal);
