import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainProductScreen from '../screens/Product/MainProduct';
import ProductListScreen from '../screens/Product/ProductList';
import ProductDetailScreen from '../screens/Product/ProductDetail';

export default createStackNavigator({
    MainProduct: MainProductScreen,
    ProductList: ProductListScreen,
    ProductDetail: ProductDetailScreen
});