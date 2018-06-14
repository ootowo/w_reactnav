import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SocialLinkModal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>SocialLinkScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SocialLinkModal;