import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const Details = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.content}>
        <Text style={Styles.paragraph}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        </Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
  },
  content: {
    width: '100%',
    marginTop: 10,
    color: 'gray',
  },
  paragraph: {color: 'gray'},
});
