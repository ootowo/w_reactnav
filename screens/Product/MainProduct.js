import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';

import CatelogScreen from './Catelog';
import FavoriteScreen from './Favorite';

class MainProductScreen extends Component {
    render() {
        return (
            <Container>
                <Tabs renderTabBar={() => <ScrollableTab style={{ borderBottomWidth: 0 }} />}>
                    <Tab heading="Catelog">
                        <CatelogScreen />
                    </Tab>
                    <Tab heading="Favorite">
                        <FavoriteScreen />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default MainProductScreen;