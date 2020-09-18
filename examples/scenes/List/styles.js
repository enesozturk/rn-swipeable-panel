import {StyleSheet, Dimensions} from 'react-native';

export const FULL_HEIGHT = Dimensions.get('window').height;
export const FULL_WIDTH = Dimensions.get('window').width;

export const Styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: FULL_WIDTH,
    paddingHorizontal: 24,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    backgroundColor: '#f4f4f4',
    paddingTop: 24,
  },
  flatList: {
    width: FULL_WIDTH,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
});
