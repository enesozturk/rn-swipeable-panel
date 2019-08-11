import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Title = ({ title }) => {
	return (
		<View style={Styles.container}>
			<Text style={Styles.title}>{title}</Text>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 15,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	title: {
		fontSize: 22,
		fontWeight: '500',
		color: 'gray'
	}
});
