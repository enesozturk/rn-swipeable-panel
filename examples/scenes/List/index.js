import React from 'react';
import { View, FlatList } from 'react-native';

import { Styles } from './styles';
import { ListItem } from './components/ListItem';

const ItemList = [ { id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' } ];

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: 1,
			isDeleteActive: false,
			selectedItems: []
		};
	}

	onItemPress = (item) => {};

	render() {
		return (
			<View style={Styles.container}>
				<FlatList
					contentContainerStyle={Styles.flatList}
					data={ItemList}
					renderItem={({ item }) => <ListItem item={item} onPress={this.props.onOpenPanel} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		);
	}
}
