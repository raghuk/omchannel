import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';

import { isEmpty } from 'lodash';

import { loadSongList, resetSongList } from '../store/actions';
import { getApiKey, getRemovableTitles, getSongList, getErrorStatus } from '../store/selectors';

import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');


class SongList extends Component {
    static propTypes = {
      apiKey: PropTypes.string,
      songList: PropTypes.arrayOf(PropTypes.object),
      removableTitles: PropTypes.arrayOf(PropTypes.string),
      errorStatus: PropTypes.bool,
      loadSongList: PropTypes.func,
      resetSongList: PropTypes.func
    }

    static defaultProps = {
      apiKey: '',
      songList: [],
      removableTitles: [],
      errorStatus: false,
      loadSongList: () => {},
      resetSongList: () => {}
    }

    constructor(props) {
      super(props);

      this.state = {
        isReady: false
      };
    }

    componentDidMount() {
      const { apiKey, songList, removableTitles, loadSongList, navigation } = this.props;
      const ids = navigation.state.params.song.playlists || [];

      if (isEmpty(songList)) {
        loadSongList(ids, apiKey, removableTitles);
      } else {
        console.log('song list already loaded, loading from props');
        this.setState({ isReady: true });
      }
    }

    componentWillReceiveProps() {
      const { isReady } = this.state;
      if (!isReady) {
        this.setState({ isReady: true });
      }
    }

    componentWillUnmount() {
      const { resetSongList } = this.props;
      resetSongList();
    }

    onCardPress = (item) => {
      const { navigation } = this.props;
      navigation.navigate('SongPlaylist', { playlist: item });
    }

    renderList = (items) => (
      <View style={styles.listView}>
        {items.map((i) => this.renderItem(i))}
      </View>
    );

    renderItem = (item) => (
      <TouchableWithoutFeedback key={item.id} onPress={() => this.onCardPress(item)}>
        <Card
          image={{ uri: item.thumbnailUrl }}
          imageStyle={styles.cardImage}
          containerStyle={[styles.cardContainer, styles.cardHeight]}
        >
          <Text numberOfLines={2} style={styles.cardTitle}>{item.title}</Text>
          <Text numberOfLines={1} style={styles.cardSubtitle}>{item.count} Episodes</Text>
        </Card>
      </TouchableWithoutFeedback>
    );

    renderError = () => <Text style={styles.errorInfo}>Sorry, something went wrong. Please try again.</Text>

    render() {
      const { isReady } = this.state;
      const { songList, errorStatus } = this.props;

      const loadingInfo = (
        <ImageBackground
          imageStyle={{ resizeMode: 'cover' }}
          style={styles.loader}
          source={loaderImage}
        >
          <ActivityIndicator size="large" color="#5C5679" />
        </ImageBackground>
      );

      if (!isReady || errorStatus) {
        return (
          <View style={styles.content}>
            {errorStatus ? this.renderError() : loadingInfo}
          </View>
        );
      }

      return (
        <ScrollView style={styles.container}>
          {this.renderList(songList)}
        </ScrollView>
      );
    }
}


const mapStateToProps = (state) => ({
  apiKey: getApiKey(state),
  songList: getSongList(state),
  removableTitles: getRemovableTitles(state),
  errorStatus: getErrorStatus(state)
});

function bindAction(dispatch) {
  return {
    loadSongList: (ids, key, removableTitles) => dispatch(loadSongList(ids, key, removableTitles)),
    resetSongList: () => dispatch(resetSongList())
  };
}

export default connect(mapStateToProps, bindAction)(SongList);
