import React, { Component } from "react";
import { View, ScrollView, TextInput, StyleSheet } from "react-native";
import {
    Container,
    Header,
    Item,
    Text,
    Input,
    Icon,
    Button
} from "native-base";

import styles from "../../styles";

class CatelogScreen extends Component {
    render() {
        return (
            <Container>
                <View style={styles.search.searchBar}>
                    <View style={styles.search.searchBar__container}>
                        <Icon
                            name="ios-search"
                            style={{ fontSize: 20, color: "#363636" }}
                        />
                        <TextInput
                            placeholder="Search..."
                            style={styles.search.searchBar__text}
                        />
                    </View>
                </View>
                <ScrollView>
                    <Text>CatelogScreen</Text>
                </ScrollView>
            </Container>
        );
    }
}

export default CatelogScreen;
