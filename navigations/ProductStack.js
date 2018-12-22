import { createStackNavigator } from "react-navigation";
import React from "react";

import MainProductScreen from "../screens/Product/MainProduct";
import ProductDetailScreen from "../screens/Product/ProductDetail";
import ProductListScreen from "../screens/Product/ProductList";

export default createStackNavigator({
  MainProduct: MainProductScreen,
  ProductList: ProductListScreen,
  ProductDetail: ProductDetailScreen
});
