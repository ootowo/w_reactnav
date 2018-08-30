import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Product Detail",
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
  }

  render() {
    const fav = true;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.productDetail__thumbnail}>
            <Image
              style={styles.productDetail__thumbnail_image}
              source={{
                uri:
                  "https://www.sinthanee.com/image/cache/product/2016-09-21/blender/tefal%20bl233-1000x1000.jpg"
              }}
            />
          </View>
          <View style={styles.productDetail__title}>
            <View style={styles.productDetail__title_head}>
              <Text style={styles.productDetail__title_head_text}>
                Otto #BE127/127A 2 litre|1200 watts
              </Text>
              <TouchableOpacity
                style={styles.productDetail__title_head_favbutton}
              >
                {fav ? (
                  <Ionicons name="ios-heart" size={23} color="#FF0000" />
                ) : (
                  <Ionicons
                    name="ios-heart-outline"
                    size={23}
                    color="#FF0000"
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.productDetail__title_oldprice}>
              Price 2590.00 Baht
            </Text>
            <Text style={styles.productDetail__title_newprice}>
              Special Price 1390.00 Baht
            </Text>
          </View>
          <View style={styles.productDetail__details}>
            <View style={styles.productDetail__details_row}>
              <Text style={styles.productDetail__details_title}>Brand</Text>
              <Text style={styles.productDetail__details_text}>Otto</Text>
            </View>
            <View style={styles.productDetail__details_row}>
              <Text style={styles.productDetail__details_title}>Details</Text>
              <Text style={styles.productDetail__details_text}>
                Heavy-Duty Blender
              </Text>
            </View>
            <View style={styles.productDetail__details_row}>
              <Text style={styles.productDetail__details_title}>Size</Text>
              <Text style={styles.productDetail__details_text}>1</Text>
            </View>
            <View style={styles.productDetail__details_row}>
              <Text style={styles.productDetail__details_title}>Code</Text>
              <Text style={styles.productDetail__details_text}>205006</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  wrapper: {},
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
    color: "#e5e5e5",
    textDecorationLine: "line-through",
    marginBottom: 5
  },
  productDetail__title_newprice: {
    color: "#FF0000",
    fontSize: 15,
    fontWeight: "bold"
  },
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
