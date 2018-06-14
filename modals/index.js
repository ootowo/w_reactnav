import React, { Component } from 'react';
import { View, Modal } from 'react-native';

import SocialLinkModal from './SocialLink';

class CoreModal extends Component {
    render() {
        return (
            <View>
                <Modal visible={false}><SocialLinkModal /></Modal>
            </View>
        )
    }
}

export default CoreModal;

