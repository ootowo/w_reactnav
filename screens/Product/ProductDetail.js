import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ProductDetailScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ProductDetailScreen</Text>
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

export default ProductDetailScreen;