import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainProfileScreen from '../screens/Profile/MainProfile';

export default createStackNavigator({
    MainProfile: MainProfileScreen
});