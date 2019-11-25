import React, { Component } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import { Container, Content, Header, Item, Input, List, ListItem, Icon, Button } from "native-base";
import { LinearGradient } from "expo";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { openShippingCheckModal } from "../../actions/modalAction";
import { fetchCatagory } from "../../apis/opencartApi";

import css from "../../styles";

class CatelogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
    this.checkIndexIsEven = this.checkIndexIsEven.bind(this);
  }

  componentDidMount() {
    // fetchCatagory()
    //   .then(res => {
    //     const { data } = res;
    //     if (data && data.success) {
    //       this.setState({ categories: data.data });
    //     }
    //   })
    //   .catch(err => {
    //     Alert.alert(err);
    //   });
    this.checkShippingAddress();
  }

  checkShippingAddress() {
    // this.props.openShippingCheckModal();
  }

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  render() {
    const { categories } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <View style={css.search.searchBar}>
          <View style={css.search.searchBar__container}>
            <Icon name="ios-search" style={{ fontSize: 20, color: "#363636" }} />
            <TextInput placeholder="Search..." style={css.search.searchBar__text} />
          </View>
        </View>
        <View style={styles.category}>
          <Content>
            <List>
              <ListItem onPress={() => navigate("ProductList")}>
                <Text style={{ fontWeight: "bold" }}>Coffee Shop</Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: "bold" }}>Retailer</Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: "bold" }}>Bakery</Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: "bold" }}>Restaurant</Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: "bold" }}>Hotel And Spa</Text>
              </ListItem>
              <ListItem>
                <Text style={{ fontWeight: "bold" }}>Other</Text>
              </ListItem>
            </List>
          </Content>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={item.category_id}
              style={[
                styles.category__item,
                this.checkIndexIsEven(index + 1) ? styles.category__item___n2child : null
              ]}
              onPress={() => navigate("ProductList", { category_data: item })}
            >
              <View style={styles.category__item_container}>
                <View style={styles.category__item_thumbnail}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{
                      uri: item.image
                        ? item.image
                        : "https://pix10.agoda.net/hotelImages/871/871705/871705_16112815520049163655.jpg?s=1024x768"
                    }}
                    resize="cover"
                  />
                </View>
                <LinearGradient
                  colors={["#FF0000", "#b20000"]}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  style={styles.category__item_title}
                >
                  <Text style={styles.category__item_title_text}>{item.name}</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    marginHorizontal: 10
  },
  category__item: {
    flex: 0,
    width: "50%",
    height: 130,
    paddingRight: 5,
    paddingBottom: 10
  },
  category__item___n2child: {
    paddingRight: 0,
    paddingLeft: 5
  },
  category__item_container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden"
  },
  category__item_thumbnail: {
    flex: 1,
    width: "100%"
  },
  category__item_title: {
    flex: 0,
    alignItems: "flex-end",
    padding: 7,
    backgroundColor: "#FF0000"
  },
  category__item_title_text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  modal: state.modalReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ openShippingCheckModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatelogScreen);
