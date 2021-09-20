import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {material} from 'react-native-typography';

export const Title = ({title}) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{title}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 18,
  },
  title: {
    ...material.body1,
    fontWeight: '500',
    color: 'black',
  },
});
