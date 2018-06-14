import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';
import { Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Constants, WebBrowser } from 'expo';

class MainMenuScreen extends Component {
    constructor(props) {
        super(props);
    }

    async onPressOpenWebSite() {
        await WebBrowser.openBrowserAsync('https://www.makroclick.com');
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={styles.container}>
                <Grid>
                    <Col>
                        <Row><Button rounded onPress={() => navigate('Coupon')}><Text>Coupon</Text></Button></Row>
                        <Row><Button rounded onPress={() => navigate('Privillage')}><Text>Privillage</Text></Button></Row>
                        <Row><Button rounded><Text>Social Networks</Text></Button></Row>
                        <Row><Button rounded onPress={() => navigate('Setting')}><Text>Settings</Text></Button></Row>
                    </Col>
                    <Col>
                        <Row><Button rounded onPress={() => navigate('Mail')}><Text>Makro Mails</Text></Button></Row>
                        <Row><Button rounded onPress={() => navigate('News')}><Text>News and Activity</Text></Button></Row>
                        <Row><Button rounded onPress={this.onPressOpenWebSite}><Text>Makro Click!</Text></Button></Row>
                        <Row></Row>
                    </Col>
                    <Col>
                        <Row><Button rounded onPress={() => navigate('ProductCatalog')}><Text>Catalog</Text></Button></Row>
                        <Row><Button rounded onPress={() => navigate('Entertainment')}><Text>Entertainment</Text></Button></Row>
                        <Row><Button rounded onPress={() => navigate('Offer')}><Text>Today Offering</Text></Button></Row>
                        <Row></Row>
                    </Col>
                </Grid>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    }
});

export default MainMenuScreen;