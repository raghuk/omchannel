import { Dimensions, StyleSheet } from 'react-native';
import { getPlatformElevation } from '../../../utils';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f8'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f8'
  },
  loader: {
    flex: 1,
    backgroundColor: '#f1f5f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.75
  },
  listView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  cardContainer: {
    width: width * 0.90,
    borderRadius: 10,
    ...getPlatformElevation(2)
  },
  cardImage: {
    height: height * 0.15,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  cardCaption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingHorizontal: 5
  },
  cardTitle: {
    color: '#372737',
    fontSize: 18,
    fontFamily: 'Titillium'
  },
  cardNote: {
    color: '#372737',
    fontSize: 16,
    fontFamily: 'Titillium'
  },
  cardSubtitle: {
    color: '#372737',
    fontSize: 16,
    fontFamily: 'Titillium',
    marginTop: 5
  },
  errorInfo: {
    color: '#cc0000',
    fontSize: 16,
    fontFamily: 'Titillium'
  }
});
