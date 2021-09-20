import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {material} from 'react-native-typography';

type SettingItemProps = {
  title: string;
  item?: Object;
  isHeader?: Boolean;
  isLast?: Boolean;
  isRed?: Boolean;
  onPress?: Function;
};

export const SettingItem = ({
  title,
  item,
  isHeader,
  isLast,
  isRed,
  onPress,
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      onPress={
        onPress
          ? () => onPress(item)
          : () => {
              return false;
            }
      }
      activeOpacity={isHeader ? 1.0 : 0.6}
      style={[
        Styles.itemContainer,
        {borderTopWidth: isHeader ? 0 : 1, borderBottomWidth: isLast ? 1 : 0},
      ]}>
      <View
        style={[
          Styles.item,
          {justifyContent: isHeader ? 'center' : 'flex-start'},
        ]}>
        <Text
          style={[
            isHeader
              ? {
                  ...material.headline,
                }
              : {
                  ...material.subheading,
                },
            {
              color: isRed ? 'red' : 'black',
            },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderTopColor: '#e6eced',
    borderBottomColor: '#e6eced',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
