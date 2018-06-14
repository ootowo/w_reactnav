import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class FavoriteScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FavoriteScreen</Text>
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

export default FavoriteScreen;