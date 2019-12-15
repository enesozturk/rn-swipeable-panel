import React from "react";
import { View, FlatList, Text } from "react-native";

import { Styles } from "./styles";
import { ListItem } from "./components/ListItem";

const ItemList = [
  { id: 1, name: "About", open: "about" },
  { id: 2, name: "Settings", open: "settings" },
  { id: 3, name: "Configurations", open: "configurations" }
];

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 1,
      isDeleteActive: false,
      selectedItems: []
    };
  }

  onItemPress = item => {};

  switchOnPress = open => {
    switch (open) {
      case "about":
        return this.props.openAboutPanel;
      case "settings":
        return this.props.openSettingsPanel;
      case "configurations":
        return this.props.openConfigurationsPanel;
      default:
        return this.props.openDefaultPanel;
    }
  };

  render() {
    return (
      <View style={Styles.container}>
        <FlatList
          contentContainerStyle={Styles.flatList}
          data={ItemList}
          renderItem={({ item }) => (
            <ListItem item={item} onPress={this.switchOnPress(item.open)} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}
