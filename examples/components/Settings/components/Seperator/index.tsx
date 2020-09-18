import React from 'react';
import {StyleSheet, View} from 'react-native';

type SeperatorProps = {
  noLine: boolean;
};

export const Seperator = ({noLine}: SeperatorProps) => {
  return (
    <View style={Styles.seperatorContainer}>
      <View
        style={[
          Styles.seperator,
          {backgroundColor: noLine ? 'rgba(0,0,0,0)' : '#e2e2e2'},
        ]}
      />
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
    marginTop: 5,
    marginBottom: 5,
  },
});
