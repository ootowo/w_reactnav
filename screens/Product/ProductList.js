import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import { fetchProducts } from "../../apis/opencartApi";

class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Products",
    headerTintColor: "#000000",
    headerBackTitle: null,
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginRight: 5, height: "100%", paddingHorizontal: 10 }}
          onPress={() => navigation.navigate("Cart")}
        >
          <View style={styles.cartIcon__badge}>
            <Text style={styles.cartIcon__badge_text}>1</Text>
          </View>
          <EvilIcons name="cart" style={{ color: "#000000", fontSize: 28 }} />
        </TouchableOpacity>
      </View>
    )
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
    this.makeRemoteRequest();
  }

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  makeRemoteRequest() {
    const { page, seed } = this.state;
    // const categoryData = this.props.navigation.getParam("category_data");

    this.setState({ loading: true });
    const products = [
      {
        id: 1,
        original_image:
          "https://img10.jd.co.th/n0/jfs/t13/76/28441736/67525/88369413/5b764e81N1914df9a.jpg!q70.jpg",
        product_description: [
          {
            name: "OTTO Powerblender"
          }
        ],
        manufacturer: "OTTO",
        model: "Powerblender",
        length: "120",
        length_class: "cm",
        sku: "12123",
        discounts: [
          {
            price: "2,000"
          }
        ],
        price: "1,990"
      }
    ];

    this.setState({ data: products, loading: false, refreshing: false });
    // fetchProducts(categoryData.category_id)
    //   .then(res => {
    //     const { data } = res;
    //     if (data && data.success) {
    //       this.setState({
    //         data: data.data,
    //         error: data.error || null,
    //         loading: false,
    //         refreshing: false
    //       });
    //     } else {
    //       this.setState({
    //         data: [],
    //         error: null,
    //         loading: false,
    //         refreshing: false
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false });
    //   });
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
        key={item.id}
        style={[
          styles.productItem,
          this.checkIndexIsEven(index + 1) ? styles.productItem__nth2 : null
        ]}
      >
        <TouchableOpacity
          style={styles.productItem__container}
          onPress={() => {
            navigate("ProductDetail", { product_data: item });
          }}
        >
          <View style={styles.productItem__card}>
            <Image style={styles.productItem__thumbnail} source={{ uri: item.original_image }} />
            <View style={styles.productItem__title}>
              <Text numberOfLines={1} style={styles.productItem__title_text}>
                {item.product_description[0].name}
              </Text>
              {item.discounts.length > 0 ? (
                <Text style={styles.productItem__title_price}>${item.discounts[0].price}</Text>
              ) : null}
              <Text
                style={
                  item.discounts.length > 0
                    ? styles.productItem__title_price_rem
                    : styles.productItem__title_price
                }
              >
                ${item.price}
              </Text>
              {/* {item.offer ? (
                <View style={styles.productItem__title_offer}>
                  <Text style={styles.productItem__title_offer_text}>Promotion: {item.offer}</Text>
                </View>
              ) : null} */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.productList}>
          <FlatList
            style={{ flexGrow: 0, height: "100%" }}
            data={this.state.data}
            numColumns={2}
            renderItem={this.renderProductItem}
            keyExtractor={item => item.id}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={50}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E2E2",
    paddingTop: 10,
    paddingHorizontal: 10
  },
  productList: {},
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
    width: "100%" - 20,
    minHeight: 150,
    flex: 1,
    margin: 10,
    resizeMode: "contain"
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
  },
  cartIcon__badge: {
    position: "absolute",
    top: -5,
    right: 5,
    backgroundColor: "#FF0000",
    minWidth: 18,
    paddingHorizontal: 5,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99
  },
  cartIcon__badge_text: { fontSize: 12, fontWeight: "bold", color: "#FFFFFF" }
});

export default ProductListScreen;
