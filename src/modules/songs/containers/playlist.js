import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';

import { loadSongPlayList, resetSongPlayList } from '../store/actions';
import { getApiKey, getRemovableTitles, getPlayList } from '../store/selectors';

import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');


class SongPlaylist extends Component {
    static propTypes = {
      apiKey: PropTypes.string,
      playList: PropTypes.arrayOf(PropTypes.object),
      removableTitles: PropTypes.arrayOf(PropTypes.string),
      loadSongPlayList: PropTypes.func.isRequired,
      resetSongPlayList: PropTypes.func.isRequired
    }

    static defaultProps = {
      apiKey: '',
      playList: [],
      removableTitles: []
    }

    constructor(props) {
      super(props);

      this.state = {
        isReady: false
      };
    }

    componentDidMount() {
      const { apiKey, removableTitles, loadSongPlayList, navigation } = this.props;
      const playlist = navigation.state.params.playlist || [];

      loadSongPlayList(playlist.title, playlist.id, apiKey, removableTitles);
    }

    componentWillReceiveProps() {
      const { isReady } = this.state;
      if (!isReady) {
        this.setState({ isReady: true });
      }
    }

    componentWillUnmount() {
      const { resetSongPlayList } = this.props;
      resetSongPlayList();
    }

    onCardPress = (item) => {
      const { navigation } = this.props;
      navigation.navigate('SongPlayer', { video: item });
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
          <Text numberOfLines={3} style={styles.cardSubtitle}>{item.title}</Text>
        </Card>
      </TouchableWithoutFeedback>
    );

    render() {
      const { isReady } = this.state;
      const { playList } = this.props;

      const loadingInfo = (
        <ImageBackground
          imageStyle={{ resizeMode: 'cover' }}
          style={styles.loader}
          source={loaderImage}
        >
          <ActivityIndicator size="large" color="#5C5679" />
        </ImageBackground>
      );

      if (!isReady) {
        return (
          <View style={styles.content}>
            {loadingInfo}
          </View>
        );
      }

      return (
        <ScrollView style={styles.container}>
          {this.renderList(playList)}
        </ScrollView>
      );
    }
}


const mapStateToProps = (state) => ({
  apiKey: getApiKey(state),
  playList: getPlayList(state),
  removableTitles: getRemovableTitles(state)
});

function bindAction(dispatch) {
  return {
    loadSongPlayList: (title, id, key, removableTitles) => dispatch(loadSongPlayList(title, id, key, removableTitles)),
    resetSongPlayList: () => dispatch(resetSongPlayList())
  };
}

export default connect(mapStateToProps, bindAction)(SongPlaylist);
