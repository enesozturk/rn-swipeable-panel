import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Seperator = ({}) => {
  return (
    <View style={Styles.seperatorContainer}>
      <View style={Styles.seperator} />
    </View>
  );
};

const Styles = StyleSheet.create({
  seperatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    width: '90%',
    height: 1,
    backgroundColor: '#e2e2e2',
    marginTop: 5,
    marginBottom: 5,
  },
});
