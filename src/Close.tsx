import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type CloseProps = {
  onPress: () => void;
  rootStyle?: object;
  iconStyle?: object;
};

export const Close = ({ onPress, rootStyle, iconStyle }: CloseProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress()} style={[CloseStyles.closeButton, rootStyle]}>
      <View style={[CloseStyles.iconLine, iconStyle, { transform: [{ rotateZ: '45deg' }] }]} />
      <View style={[CloseStyles.iconLine, iconStyle, { transform: [{ rotateZ: '135deg' }] }]} />
    </TouchableOpacity>
  );
};

const CloseStyles = StyleSheet.create({
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#e2e2e2',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLine: {
    position: 'absolute',
    width: 18,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'white',
  },
});
