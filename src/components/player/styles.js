import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  webView: {
    flex: 1,
    width: deviceWidth,
    borderWidth: 1,
    borderColor: 'blue'
  }
});
