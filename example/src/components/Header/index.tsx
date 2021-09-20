import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { material } from 'react-native-typography';

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => (
  <View style={HeaderStyles.container}>
    <View style={HeaderStyles.innerContent}>
      <Text style={HeaderStyles.title}>{title}</Text>
    </View>
  </View>
);

const HeaderStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerContent: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  },
  title: {
    ...material.display1,
    color: '#24292E',
    fontWeight: '600',
    marginBottom: 5,
  },
});
