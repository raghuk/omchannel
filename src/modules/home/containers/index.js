import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator, ImageBackground, Text, Alert, NetInfo, FlatList, TouchableWithoutFeedback, DeviceEventEmitter } from 'react-native';
import { Card } from 'react-native-elements';
import { isEmpty } from 'lodash';

import { Video, ScreenOrientation } from 'expo';
import AnimatedCard from '../../../components/animated/card';

import { loadNews, resetNewsList, resetNewsPlayList } from '../../news/store/actions';
import { loadShows, resetShowList, resetShowPlayList } from '../../shows/store/actions';
import { loadSongs, resetSongList, resetSongPlayList } from '../../songs/store/actions';
import { getUpdatedAt, getShows } from '../../shows/store/selectors';
import { getSongs } from '../../songs/store/selectors';
import { getTime } from '../../../helpers';

import { WEBCAST_LIVE_URL } from '../../../setup/config';
import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');
const playerImage = require('../../../../assets/images/player.jpg');


class Home extends Component {
    static propTypes = {
      songs: PropTypes.arrayOf(PropTypes.object),
      shows: PropTypes.arrayOf(PropTypes.object),
      updatedAt: PropTypes.number,
      loadShows: PropTypes.func.isRequired,
      resetShowList: PropTypes.func.isRequired,
      resetShowPlayList: PropTypes.func.isRequired,
      loadSongs: PropTypes.func.isRequired,
      resetSongList: PropTypes.func.isRequired,
      resetSongPlayList: PropTypes.func.isRequired,
      loadNews: PropTypes.func.isRequired,
      resetNewsList: PropTypes.func.isRequired,
      resetNewsPlayList: PropTypes.func.isRequired
    }

    static defaultProps = {
      songs: [],
      shows: [],
      updatedAt: 0
    }

    constructor(props) {
      super(props);

      this.state = {
        isReady: false,
        isConnected: true,
        showLive: false
      };
    }

    componentDidMount() {
      const { shows, updatedAt, loadShows, loadSongs, loadNews } = this.props;
      const { resetShowList, resetShowPlayList, resetSongList, resetSongPlayList, resetNewsList, resetNewsPlayList } = this.props;

      NetInfo.isConnected.fetch().then((isConnected) => {
        if (isConnected) {
          const diff = getTime(new Date(updatedAt), new Date());

          if (isEmpty(shows) || (diff > 2)) {
            loadShows();
            loadSongs();
          } else {
            console.log('data already loaded, loading from props');
            this.setState({ isReady: true, isConnected: true });
          }

          // always check for latest news
          loadNews();

          // reset loaded playlist data in case it did not clear
          resetShowList();
          resetShowPlayList();
          resetSongList();
          resetSongPlayList();
          resetNewsList();
          resetNewsPlayList();
        } else {
          this.setState({ isReady: true, isConnected: false });
        }

        return isConnected;
      }).catch((e) => { console.log(e); });

      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
      this.routeSubscription = DeviceEventEmitter.addListener('routeStateChanged', this.onRouteStateChanged);
    }

    componentWillReceiveProps() {
      this.setState({ isReady: true, isConnected: true });
    }

    componentWillUnmount() {
      this.routeSubscription.remove();
    }

    onRouteStateChanged = (route) => {
      const { navigation } = this.props;
      const { showLive } = this.state;

      if (navigation.state.routeName !== route.routeName && navigation.state.key !== route.key && showLive) {
        this.videoRef.stopAsync();
        this.setState({ showLive: false });
      }
    }

    renderContent = () => {
      const { shows, songs } = this.props;

      return (
        <View style={{ flex: 1 }}>
          <View style={[styles.content, styles.videoContainer]}>
            {this.renderPlayer()}
          </View>

          <View style={styles.content}>
            <Text style={styles.header}>Shows</Text>
            {this.renderList(shows, 'shows')}
          </View>

          <View style={[styles.content, styles.last]}>
            <Text style={styles.header}>Songs</Text>
            {this.renderList(songs, 'songs')}
          </View>
        </View>
      );
    }

    renderPlayer = () => {
      const { showLive } = this.state;

      if (showLive) {
        return (
          <View style={styles.videoView}>
            <Video
              ref={(component) => { this.videoRef = component; }}
              source={{ uri: WEBCAST_LIVE_URL }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={Video.RESIZE_MODE_COVER}
              shouldPlay
              useNativeControls={false}
              style={styles.videoPlayer}
            />
          </View>
        );
      }

      return (
        <TouchableWithoutFeedback key="player" onPress={() => this.onPlayPress()}>
          <ImageBackground
            imageStyle={{ resizeMode: 'cover' }}
            style={styles.videoView}
            source={playerImage}
          />
        </TouchableWithoutFeedback>
      );
    }

    renderList = (data, name) => (
      <FlatList
        horizontal
        data={data}
        renderItem={({ item, index }) => this.renderItem(item, name, index)}
        keyExtractor={(item) => item.title}
      />
    );

    renderItem = (item, name, index) => {
      const count = item.playlists.length;

      return (
        <AnimatedCard key={index} index={index}>
          <TouchableWithoutFeedback onPress={() => this.onCardPress(item, name)}>
            <Card
              image={{ uri: item.thumbnailUrl }}
              imageStyle={styles.cardImage}
              containerStyle={styles.cardContainer}
            >
              <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
              {name === 'shows' && <Text numberOfLines={1} style={styles.cardSubtitle}>{count} Shows</Text>}
            </Card>
          </TouchableWithoutFeedback>
        </AnimatedCard>
      );
    }

    onPlayPress = () => this.setState({ showLive: true });

    onCardPress = (item, name) => {
      const { navigation } = this.props;
      if (name === 'shows') {
        navigation.navigate('ShowList', { show: item });
      } else if (name === 'songs') {
        navigation.navigate('SongList', { song: item });
      }
    }

    showAlert = () => {
      Alert.alert(
        'Internet Error',
        'Please check your internet connection and try again later.',
        [{ text: 'OK', onPress: () => console.log('OK') }],
        { cancelable: false }
      );
    }

    render() {
      const { isReady, isConnected } = this.state;

      const loadingInfo = (
        <ImageBackground
          imageStyle={{ resizeMode: 'cover' }}
          style={styles.loader}
          source={loaderImage}
        >
          <ActivityIndicator size="large" color="#5C5679" />
        </ImageBackground>
      );

      const loadContent = isConnected ? this.renderContent() : this.showAlert();

      return (
        <ScrollView style={styles.container}>
          {isReady ? loadContent : loadingInfo}
        </ScrollView>
      );
    }
}


const mapStateToProps = (state) => ({
  shows: getShows(state),
  songs: getSongs(state),
  updatedAt: getUpdatedAt(state)
});

function mapDispatchToProps(dispatch) {
  return {
    loadShows: () => dispatch(loadShows()),
    resetShowList: () => dispatch(resetShowList()),
    resetShowPlayList: () => dispatch(resetShowPlayList()),
    loadSongs: () => dispatch(loadSongs()),
    resetSongList: () => dispatch(resetSongList()),
    resetSongPlayList: () => dispatch(resetSongPlayList()),
    loadNews: () => dispatch(loadNews()),
    resetNewsList: () => dispatch(resetNewsList()),
    resetNewsPlayList: () => dispatch(resetNewsPlayList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
