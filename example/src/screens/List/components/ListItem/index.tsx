import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Styles} from './styles';
import Icon from '@expo/vector-icons/Feather';

type ListItemProps = {
  item: Object,
  onPress: Function,
  styles: Object,
  dark: Boolean,
};

export const ListItem = ({item, onPress, styles, dark}: ListItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={[
        Styles.item,
        styles,
        {
          backgroundColor: dark ? '#24292E' : '#f4f4f4',
          borderWidth: 1,
          borderColor: '#DCDCDC',
        },
      ]}
      onPress={() => onPress(item)}>
      <View style={Styles.info}>
        <Icon
          name={item.icon}
          size={30}
          color={dark ? '#f4f4f4' : '#24292e'}
          style={{marginBottom: 10}}
        />
        <Text style={{fontSize: 22, color: dark ? '#f4f4f4' : '#24292e'}}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
