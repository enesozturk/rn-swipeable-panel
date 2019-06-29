import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Styles } from './styles';

export const ListItem = ({ item, onPress }) => {
	return (
		<TouchableOpacity activeOpacity={1.0} style={Styles.item} onPress={() => onPress(item)}>
			<View style={Styles.image} />
			<View style={Styles.info}>
				<View style={Styles.name} />
				<View style={Styles.brand} />
				<View style={Styles.status} />
			</View>
		</TouchableOpacity>
	);
};
