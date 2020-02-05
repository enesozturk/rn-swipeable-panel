import React from 'react';
import {StyleSheet, View} from 'react-native';

type BarProps = {
  barStyles?: Object;
};

export const Bar = ({barStyles}: BarProps) => {
  return (
    <View style={BarStyles.barContainer}>
      <View style={[BarStyles.bar, barStyles]} />
    </View>
  );
};

const BarStyles = StyleSheet.create({
  barContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: '40%',
    height: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#e2e2e2',
  },
});
