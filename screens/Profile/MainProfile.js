import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import {
  Root,
  Container,
  Content,
  List,
  ListItem,
  Body,
  Left
} from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

class MainProfileScreen extends Component {
  static navigationOptions = ({ natigation }) => ({
    header: null
  });

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#DDDDDD" }}
        forceInset={{ bottom: "always", top: "always" }}
      >
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImage}>
              <Image
                style={styles.profileImage__photo}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBapT6eBUt5RFRTxWPwztndojMWqgwoLLxD1lCwhUJ834nLXSk"
                }}
              />
            </View>
            <View style={styles.profileName}>
              <Text style={styles.profileName__text}>Bryan Cool</Text>
              <Text style={styles.profileName__number}>0123456789</Text>
            </View>
          </View>
          <View style={styles.profileMenu}>
            <Container>
              <Content>
                <List>
                  <ListItem icon>
                    <Left>
                      <Ionicons name="ios-heart" size={20} color="#635F62" />
                    </Left>
                    <Body>
                      <Text>Favorite Products</Text>
                    </Body>
                  </ListItem>
                  <ListItem itemDivider />
                  <ListItem icon>
                    <Left>
                      <FontAwesome
                        name="facebook-official"
                        size={20}
                        color="#3b5998"
                      />
                    </Left>
                    <Body>
                      <Text>Follow me on Facebook</Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <FontAwesome name="sign-out" size={20} color="#FF0000" />
                    </Left>
                    <Body>
                      <Text>Logout</Text>
                    </Body>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#635F62"
                      }}
                    >
                      Version 3.4 (2018)
                    </Text>
                  </ListItem>
                </List>
              </Content>
            </Container>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  profileHeader: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    height: 130,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#FF0000"
  },
  profileImage: {
    flex: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    overflow: "hidden"
  },
  profileImage__photo: {
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  profileName: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    marginLeft: 15
  },
  profileName__text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  profileName__number: {
    color: "#FFFFFF",
    marginTop: 5
  },
  profileMenu: {
    flex: 1
  }
});

export default MainProfileScreen;
