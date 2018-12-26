import { Dimensions, StyleSheet } from 'react-native';
import { getPlatformElevation } from '../../../utils';

const { width, height } = Dimensions.get('window');

const viewWidth = width * 0.95;
const viewHeight = (9 / 16) * viewWidth;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f8'
  },
  content: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#f1f5f8'
  },
  loader: {
    flex: 1,
    backgroundColor: '#f1f5f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.75
  },
  header: {
    fontSize: 20,
    fontFamily: 'Opensans',
    paddingHorizontal: 15
  },
  separator: {
    height: '45%',
    width: 1,
    alignSelf: 'center',
    backgroundColor: '#372737'
  },
  videoView: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  },
  videoContainer: {
    height: 175,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#efefef',
    ...getPlatformElevation(2)
  },
  videoPlayer: {
    width: viewWidth,
    height: viewHeight,
    alignSelf: 'center'
  },
  cardContainer: {
    width: width * 0.40,
    borderRadius: 10,
    marginBottom: 10,
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
    paddingHorizontal: 10
  },
  cardTitle: {
    color: '#372737',
    fontSize: 16,
    fontFamily: 'Titillium'
  },
  cardSubtitle: {
    color: '#372737',
    fontSize: 14,
    fontFamily: 'Titillium',
    marginTop: 2
  }
});
