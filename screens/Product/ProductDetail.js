import React, { Component } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { fetchProductDetail } from "../../apis/opencartApi";

class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Product Detail",
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: null
    };
  }

  componentDidMount() {
    const productData = this.props.navigation.getParam("product_data");
    const product = productData;
    this.setState({ product, loading: false });
    // fetchProductDetail(productData.id)
    //   .then(res => {
    //     const { data } = res;
    //     if (data && data.success) {
    //       console.log(data.data);
    //       this.setState({ product: data.data, loading: false });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    const fav = false;
    const { product, loading } = this.state;
    if (loading && product === null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.wrapper}>
            {product.original_image && (
              <View style={styles.productDetail__thumbnail}>
                <Image
                  style={styles.productDetail__thumbnail_image}
                  source={{
                    uri: product.original_image
                  }}
                />
              </View>
            )}

            <View style={styles.productDetail__title}>
              <View style={styles.productDetail__title_head}>
                {product.product_description && (
                  <Text style={styles.productDetail__title_head_text}>
                    {product.product_description[0].name}
                  </Text>
                )}
                {/* <TouchableOpacity style={styles.productDetail__title_head_favbutton}>
                  {fav ? (
                    <Ionicons name="ios-heart" size={23} color="#FF0000" />
                  ) : (
                    <Ionicons name="ios-heart-outline" size={23} color="#FF0000" />
                  )}
                </TouchableOpacity> */}
              </View>

              {product.discounts.length > 0 ? (
                <>
                  <Text style={styles.productDetail__title_oldprice}>Price ${product.price}</Text>
                  <Text style={styles.productDetail__title_newprice}>
                    Special Price ${product.discounts[0].price}
                  </Text>
                </>
              ) : (
                <Text style={styles.productDetail__title_newprice}>Price ${product.price}</Text>
              )}
              {/* <View style={styles.productDetail__promo}>
                <Text style={styles.productDetail__promo_text}>Promotion: Earn more 2 pcs</Text>
              </View> */}
            </View>
            <View style={styles.productDetail__details}>
              <View style={styles.productDetail__details_row}>
                <Text style={styles.productDetail__details_title}>Brand</Text>
                <Text style={styles.productDetail__details_text}>{product.manufacturer}</Text>
              </View>
              <View style={styles.productDetail__details_row}>
                <Text style={styles.productDetail__details_title}>Details</Text>
                <Text style={styles.productDetail__details_text}>{product.model}</Text>
              </View>
              <View style={styles.productDetail__details_row}>
                <Text style={styles.productDetail__details_title}>Size</Text>
                <Text style={styles.productDetail__details_text}>
                  {product.length} {product.length_class}
                </Text>
              </View>
              {product.sku != " " && (
                <View style={styles.productDetail__details_row}>
                  <Text style={styles.productDetail__details_title}>Code</Text>
                  <Text style={styles.productDetail__details_text}>{product.sku}</Text>
                </View>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.addToCartBtn}>
            <MaterialIcons
              style={{ paddingRight: 10 }}
              name="add-shopping-cart"
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.addToCartBtn__text}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  wrapper: {
    flex: 1
  },
  addToCartBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  addToCartBtn__text: {
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  productDetail__thumbnail: {
    height: 300,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cecece"
  },
  productDetail__thumbnail_image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  productDetail__title: {
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    padding: 10
  },
  productDetail__title_head: {
    marginBottom: 5,
    flex: 1,
    flexDirection: "row"
  },
  productDetail__title_head_text: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1
  },
  productDetail__title_head_favbutton: {
    flex: 0
  },
  productDetail__title_oldprice: {
    color: "#a4a4a4",
    textDecorationLine: "line-through",
    marginBottom: 5
  },
  productDetail__title_newprice: {
    color: "#FF0000",
    fontSize: 15,
    fontWeight: "bold"
  },
  productDetail__promo: {
    backgroundColor: "#FF0000",
    marginTop: 10,
    padding: 10,
    borderRadius: 5
  },
  productDetail__promo_text: { color: "#FFFFFF", fontWeight: "bold" },
  productDetail__details: {
    padding: 10
  },
  productDetail__details_row: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 8
  },
  productDetail__details_title: {
    flex: 1,
    width: "50%"
  },
  productDetail__details_text: {
    flex: 1,
    width: "50%"
  }
});

export default ProductDetailScreen;
