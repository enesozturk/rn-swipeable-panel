/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header } from './components/Header';
import List from './scenes/List';
import { PanelContent } from './components/PanelContent';

import SwipeablePanel from 'rn-swipeable-panel';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			swipeablePanelActive: false
		};
	}

	componentDidMount = () => {};

	openPanel = () => {
		this.setState({ swipeablePanelActive: true });
	};

	closePanel = () => {
		this.setState({ swipeablePanelActive: false });
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header title={'List'} />
				<List onOpenPanel={this.openPanel} />
				{/* <SwipeablePanel
					isActive={this.state.swipeablePanelActive}
					onClose={this.closePanel}
				>
					<PanelContent />
				</SwipeablePanel> */}

				{/* <SwipeablePanel
					fullWidth
					isActive={this.state.swipeablePanelActive}
					onClose={this.closePanel}
				>
					<PanelContent />
				</SwipeablePanel> */}

				<SwipeablePanel
					fullWidth
					openLarge
					isActive={this.state.swipeablePanelActive}
					onClose={this.closePanel}
					onPressCloseButton={this.closePanel}
				>
					<PanelContent />
				</SwipeablePanel>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EEF4F6'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});
