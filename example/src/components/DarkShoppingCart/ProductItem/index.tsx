import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import Icon from '@expo/vector-icons/Feather';
import {material} from 'react-native-typography';

type ProductItemProps = {
  title?: string;
  description?: string;
  quantity?: number;
};

export const ProductItem = ({
  title,
  description,
  quantity,
}: ProductItemProps) => {
  return (
    <View style={Styles.itemContainer}>
      <View style={Styles.imageAndTitleWrapper}>
        <View style={Styles.image}>
          <Icon name="package" size={30} color={'#24292E'} />
        </View>
        <View>
          <Text style={Styles.productTitle}>{title}</Text>
          <Text style={Styles.productDescription}>{description}</Text>
        </View>
      </View>
      <View>
        <Text style={Styles.quantity}>{quantity}x</Text>
      </View>
      <Icon name="trash" size={30} color={'rgba(255,255,255,0.2)'} />
    </View>
  );
};

const Styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageAndTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {...material.headline, color: 'white'},
  productDescription: {...material.body2, color: 'white'},
  quantity: {...material.subheading, color: 'white'},
});
