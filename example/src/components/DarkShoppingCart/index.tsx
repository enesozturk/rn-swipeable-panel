import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import {ProductItem} from './ProductItem';

export const DarkPanel = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.titleWrapper}>
        <Icon
          name="shopping-cart"
          size={30}
          color={'white'}
          style={Styles.titleIcon}
        />
        <Text style={Styles.title}>Shopping Card</Text>
      </View>
      <ProductItem
        title="Product 1"
        description="Short description.."
        quantity={1}
      />
      <ProductItem
        title="Product 2"
        description="Short description.."
        quantity={2}
      />
      <ProductItem
        title="Product 3"
        description="Short description.."
        quantity={1}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
  },
  titleWrapper: {display: 'flex', flexDirection: 'row', marginBottom: 10},
  titleIcon: {marginRight: 10},
  title: {color: 'white', fontSize: 24, marginBottom: 16},
});
