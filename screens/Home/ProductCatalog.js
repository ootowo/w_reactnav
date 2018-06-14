import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CatelogScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CatelogScreen</Text>
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

export default CatelogScreen;