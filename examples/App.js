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

import { Settings } from './components/Settings';
import { About } from './components/About';

import SwipeablePanel from 'rn-swipeable-panel';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			swipeablePanelActive: false,
			content: () => null
		};
	}

	componentDidMount = () => {};

	openAboutPanel = () => {
		this.setState({ swipeablePanelActive: true, openLarge: true, content: () => <About /> });
	};

	openSettingsPanel = () => {
		this.setState({ swipeablePanelActive: true, content: () => <Settings /> });
	};

	openDefaultPanel = () => {
		this.setState({ swipeablePanelActive: true, content: () => null });
	};

	closePanel = () => {
		this.setState({ swipeablePanelActive: false, openLarge: false, content: () => null });
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header title={'Examples'} />
				<List
					openDefaultPanel={this.openDefaultPanel}
					openSettingsPanel={this.openSettingsPanel}
					openAboutPanel={this.openAboutPanel}
				/>
				<SwipeablePanel
					fullWidth
					openLarge={this.state.openLarge}
					isActive={this.state.swipeablePanelActive}
					onClose={this.closePanel}
					onPressCloseButton={this.closePanel}
				>
					{this.state.content()}
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
