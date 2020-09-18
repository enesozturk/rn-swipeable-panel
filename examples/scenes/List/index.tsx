import React from 'react';
import {View} from 'react-native';

import {Styles} from './styles';
import {ListItem} from './components/ListItem';

const ItemList = [
  {id: 1, name: 'About', icon: 'info', open: 'about'},
  {id: 2, name: 'Settings', icon: 'settings', open: 'settings'},
  {
    id: 3,
    name: 'Configurations',
    icon: 'sliders',
    open: 'configurations',
  },
  {
    id: 4,
    name: 'Dark Example',
    icon: 'moon',
    open: 'darkexample',
  },
];

type ListProps = {
  openAboutPanel: Function;
  openSettingsPanel: Function;
  openConfigurationsPanel: Function;
  openDarkPanel: Function;
  openDefaultPanel: Function;
};

type ListState = {
  category: number;
  isDeleteActive: Boolean;
  selectedItems: Array<Object>;
};

export default class List extends React.Component<ListProps, ListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      category: 1,
      isDeleteActive: false,
      selectedItems: [],
    };
  }

  onItemPress = (item: Object) => {};

  switchOnPress = (open: string) => {
    switch (open) {
      case 'about':
        return this.props.openAboutPanel;
      case 'settings':
        return this.props.openSettingsPanel;
      case 'configurations':
        return this.props.openConfigurationsPanel;
      case 'darkexample':
        return this.props.openDarkPanel;
      default:
        return this.props.openDefaultPanel;
    }
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ListItem
            dark={false}
            styles={{marginRight: 10}}
            item={ItemList[0]}
            onPress={this.switchOnPress(ItemList[0].open)}
          />
          <ListItem
            dark={false}
            styles={{}}
            item={ItemList[1]}
            onPress={this.switchOnPress(ItemList[1].open)}
          />
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ListItem
            dark={false}
            styles={{marginRight: 10}}
            item={ItemList[2]}
            onPress={this.switchOnPress(ItemList[2].open)}
          />
          <ListItem
            dark
            styles={{}}
            item={ItemList[3]}
            onPress={this.switchOnPress(ItemList[3].open)}
          />
        </View>
      </View>
    );
  }
}
