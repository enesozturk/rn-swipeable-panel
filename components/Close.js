import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const Close = ({ onPress }) => {
	return <TouchableOpacity onPress={onPress} style={CloseStyles.closeButton} />;
};

const CloseStyles = StyleSheet.create({
	closeButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		position: 'absolute',
		right: 20,
		top: 20,
		backgroundColor: '#e2e2e2',
		zIndex: 3
	}
});
