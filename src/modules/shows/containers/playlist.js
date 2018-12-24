import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';

import { isEmpty } from 'lodash';

import { loadPlayList, resetPlayList } from '../store/actions';
import { getApiKey, getRemovableTitles, getPlayList } from '../store/selectors';

import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');


class ShowPlaylist extends Component {
    static propTypes = {
      apiKey: PropTypes.string,
      playList: PropTypes.arrayOf(PropTypes.object),
      removableTitles: PropTypes.arrayOf(PropTypes.string),
      loadPlayList: PropTypes.func.isRequired,
      resetPlayList: PropTypes.func.isRequired
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
      const { apiKey, playList, removableTitles, loadPlayList, navigation } = this.props;
      const playlist = navigation.state.params.playlist || [];

      if (isEmpty(playList)) {
        loadPlayList(playlist.title, playlist.id, apiKey, removableTitles);
      } else {
        console.log('play list already loaded, loading from props');
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
      const { resetPlayList } = this.props;
      resetPlayList();
    }

    onCardPress = (item) => {
      const { navigation } = this.props;
      navigation.navigate('ShowPlayer', { video: item });
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
    loadPlayList: (title, id, key, removableTitles) => dispatch(loadPlayList(title, id, key, removableTitles)),
    resetPlayList: () => dispatch(resetPlayList())
  };
}

export default connect(mapStateToProps, bindAction)(ShowPlaylist);
