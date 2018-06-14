import React from 'react';
import { AppLoading, Asset, Font } from 'expo'
import { Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import CoreNavigation from './navigations';
import CoreModal from './modals';

const cacheImages = (images) => {
	return images.map(image => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		} else {
			return Asset.fromModule(image).downloadAsync();
		}
	});
}

const cacheFonts = (fonts) => {
	return fonts.map(font => Font.loadAsync(font));
}

class App extends React.Component {
	state = {
		isReady: false
	}

	async _loadAssetsAsync() {
		const imageAssets = cacheImages([
			'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
		]);
		const fontAssets = cacheFonts([{
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		}, ...FontAwesome.font, ...Ionicons.font]);

		await Promise.all([...imageAssets, ...fontAssets]);
	}

	render() {
		if (this.state.isReady) {
			return (
				<AppLoading
					startAsync={this._loadAssetsAsync}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}
		return (
			<CoreNavigation />
		);
	}
}

export default App;
