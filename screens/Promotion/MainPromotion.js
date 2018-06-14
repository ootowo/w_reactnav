import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MainPromotionScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MainPromotionScreen</Text>
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

export default MainPromotionScreen;