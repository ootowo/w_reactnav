import React, { Component } from "react";

import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { Container, Header, Item, Input, Icon, Button } from "native-base";

import ProfileHeader from "../../components/ProfileHeader";
import CardHeader from "../../components/CardHeader";

import css from "../../styles";

class MainPromotionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Promotions",
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: true
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);

    this.renderFooter = this.renderFooter.bind(this);
    this.renderProductItem = this.renderProductItem.bind(this);
    this.checkIndexIsEven = this.checkIndexIsEven.bind(this);
  }

  componentDidMount() {
    // this.makeRemoteRequest();
    const mockup = [
      {
        id: 0,
        title: "Otto Heavy Duty Blender",
        image: {
          uri:
            "http://bansmartshop.com/image/cache/data/0update/2014-12/06/620x620xDM2SPD-lglam.jpg.pagespeed.ic.tLSIITBsvr-3-8-1-1-600x600.png"
        },
        price: 2590.0,
        special_price: 1000.0,
        offer: "Earn more 2 pcs"
      }
    ];
    this.setState({ data: mockup });
  }

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  makeRemoteRequest() {
    const { page, seed } = this.state;
    const url = `https://jsonplaceholder.typicode.com/albums`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res : [...this.state.data, ...res],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  handleRefresh() {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }

  handleLoadMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  }

  renderProductItem({ item, index }) {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={[
          styles.productItem,
          this.checkIndexIsEven(index + 1) ? styles.productItem__nth2 : null
        ]}
      >
        <TouchableOpacity
          style={styles.productItem__container}
          onPress={() => {
            navigate("ProductDetail");
          }}
        >
          <View style={styles.productItem__card}>
            <Image style={styles.productItem__thumbnail} source={item.image} />
            <View style={styles.productItem__title}>
              <Text numberOfLines={1} style={styles.productItem__title_text}>
                {item.title}
              </Text>
              {item.special_price ? (
                <Text style={styles.productItem__title_price}>{item.special_price} USD</Text>
              ) : null}
              <Text
                style={
                  item.special_price
                    ? styles.productItem__title_price_rem
                    : styles.productItem__title_price
                }
              >
                {item.price} USD
              </Text>
              {item.offer ? (
                <View style={styles.productItem__title_offer}>
                  <Text style={styles.productItem__title_offer_text}>Promotion: {item.offer}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={css.search.searchBar}>
            <View style={css.search.searchBar__container}>
              <Icon name="ios-search" style={{ fontSize: 20, color: "#363636" }} />
              <TextInput placeholder="Search..." style={css.search.searchBar__text} />
            </View>
          </View>
          <View style={styles.productList}>
            <FlatList
              style={{ flexGrow: 0 }}
              data={this.state.data}
              numColumns={2}
              renderItem={this.renderProductItem}
              keyExtractor={item => item.id}
              ListFooterComponent={this.renderFooter}
              // onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              // onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={50}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e2e2"
  },
  productList: {
    paddingTop: 10,
    paddingHorizontal: 10
  },
  productItem: {
    width: "50%",
    paddingRight: 5,
    paddingBottom: 10
  },
  productItem__nth2: {
    paddingRight: 0,
    paddingLeft: 5
  },
  productItem__container: {},
  productItem__card: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF"
  },
  productItem__thumbnail: {
    width: "100%",
    minHeight: 150,
    flex: 1
  },
  productItem__title: {
    padding: 10
  },
  productItem__title_text: {},
  productItem__title_price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000"
  },
  productItem__title_price_rem: {
    textDecorationLine: "line-through",
    color: "#a4a4a4"
  },
  productItem__title_offer: {
    backgroundColor: "#FF0000",
    borderRadius: 5,
    padding: 5,
    marginTop: 5
  },
  productItem__title_offer_text: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

export default MainPromotionScreen;
