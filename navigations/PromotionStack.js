import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainPromotionScreen from '../screens/Promotion/MainPromotion';
import PromotionProductDetailScreen from '../screens/Promotion/PromotionProductDetail';

export default createStackNavigator({
    MainPromotion: MainPromotionScreen,
    PromotionProductDetail: PromotionProductDetailScreen
});