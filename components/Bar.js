import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Bar = ({}) => {
	return <View style={BarStyles.bar} />;
};

const BarStyles = StyleSheet.create({
	bar: {
		width: '60%',
		height: 6,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: '#e2e2e2'
	}
});
