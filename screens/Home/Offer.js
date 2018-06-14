import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class OfferScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>OfferScreen</Text>
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

export default OfferScreen;