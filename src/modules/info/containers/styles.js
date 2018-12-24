import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f8'
  },
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f1f5f8'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Opensans'
  },
  note: {
    color: '#2e78b7',
    fontSize: 16,
    fontFamily: 'Titillium',
    marginBottom: 10
  },
  info: {
    fontSize: 16,
    fontFamily: 'Titillium',
    marginBottom: 20
  },
  loader: {
    flex: 1,
    backgroundColor: '#f1f5f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.75
  }
});
