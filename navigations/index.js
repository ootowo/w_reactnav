import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/Login';
import SelectBranchScreen from '../screens/SelectBranch';
import MainStack from './MainStack';

export default createStackNavigator({
//    Login: LoginScreen,
//    SelectBranch: SelectBranchScreen,
    Main: MainStack
}, {
    headerMode: 'none',
    cardStyle: {
		paddingTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
		backgroundColor: '#FFFFFF'
	}
});