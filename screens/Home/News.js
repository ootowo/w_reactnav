import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class NewsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>NewsScreen</Text>
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

export default NewsScreen;