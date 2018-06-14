import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Item, Text, Input, Icon, Button } from 'native-base';

class CatelogScreen extends Component {
    render() {
        return (
            <Container>
                <Header searchBar>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search products" />
                    </Item>
                </Header>
                <View style={styles.container}>
                    <Text>CatelogScreen</Text>
                </View>
            </Container>
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