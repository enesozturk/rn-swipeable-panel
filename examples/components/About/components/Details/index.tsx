import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {material} from 'react-native-typography';

export const Details = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.content}>
        <Text style={Styles.paragraph}>
          {
            'rn-swipeable-panel is a swipeable, easy to use bottom panel for your React Native projects. You can extend panel by swiping up, make it small or close by swiping down with pan gestures. Feel free to redesign inside of the panel.'
          }
        </Text>
      </View>
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
  content: {
    width: '100%',
    color: 'gray',
  },
  paragraph: {...material.body1, color: 'gray'},
});
