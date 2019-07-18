import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Styles } from './styles';

export const ListItem = ({ item, onPress }) => {
	return (
		<TouchableOpacity activeOpacity={1.0} style={Styles.item} onPress={() => onPress(item)}>
			<View style={Styles.info}>
				<Text>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);
};
