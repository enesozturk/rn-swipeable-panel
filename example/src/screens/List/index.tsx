import React from 'react';
import { View } from 'react-native';

import { Styles } from './styles';
import { ListItem } from './components/ListItem';

const ItemList = [
  { id: 1, name: 'About', icon: 'info', open: 'about' },
  { id: 2, name: 'Settings', icon: 'settings', open: 'settings' },
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

const List = ({
  openAboutPanel,
  openSettingsPanel,
  openConfigurationsPanel,
  openDarkPanel,
  openDefaultPanel,
}: ListProps) => {
  const switchOnPress = (open: string) => {
    switch (open) {
      case 'about':
        return openAboutPanel;
      case 'settings':
        return openSettingsPanel;
      case 'configurations':
        return openConfigurationsPanel;
      case 'darkexample':
        return openDarkPanel;
      default:
        return openDefaultPanel;
    }
  };

  return (
    <View style={Styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem
          dark={false}
          styles={{ marginRight: 10 }}
          item={ItemList[0]}
          onPress={switchOnPress(ItemList[0].open)}
        />
        <ListItem dark={false} styles={{}} item={ItemList[1]} onPress={switchOnPress(ItemList[1].open)} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem
          dark={false}
          styles={{ marginRight: 10 }}
          item={ItemList[2]}
          onPress={switchOnPress(ItemList[2].open)}
        />
        <ListItem dark styles={{}} item={ItemList[3]} onPress={switchOnPress(ItemList[3].open)} />
      </View>
    </View>
  );
};

export default List;
