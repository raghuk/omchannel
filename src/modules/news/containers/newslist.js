import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';
import { isEmpty } from 'lodash';

import { loadNewsList, resetNewsList } from '../store/actions';
import { getApiKey, getRemovableTitles, getNewsList, getErrorStatus } from '../store/selectors';

import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');
const playlistImage = require('../../../../assets/images/playlist.jpg');


class NewsList extends Component {
    static propTypes = {
      apiKey: PropTypes.string,
      newsList: PropTypes.arrayOf(PropTypes.object),
      removableTitles: PropTypes.arrayOf(PropTypes.string),
      errorStatus: PropTypes.bool,
      loadNewsList: PropTypes.func.isRequired,
      resetNewsList: PropTypes.func.isRequired
    }

    static defaultProps = {
      apiKey: '',
      newsList: [],
      removableTitles: [],
      errorStatus: false
    }

    constructor(props) {
      super(props);

      this.state = {
        isReady: false
      };
    }

    componentDidMount() {
      const { apiKey, removableTitles, loadNewsList, navigation } = this.props;
      const ids = navigation.state.params.news.playlists || [];

      loadNewsList(ids, apiKey, removableTitles);
    }

    componentWillReceiveProps() {
      const { isReady } = this.state;
      if (!isReady) {
        this.setState({ isReady: true });
      }
    }

    componentWillUnmount() {
      const { resetNewsList } = this.props;
      resetNewsList();
    }

    onCardPress = (item) => {
      const { navigation } = this.props;
      navigation.navigate('NewsPlaylist', { playlist: item });
    }

    renderList = (items) => (
      <View style={styles.listView}>
        {items.map((i) => this.renderItem(i))}
      </View>
    );

    renderItem = (item) => (
      <TouchableWithoutFeedback key={item.id} onPress={() => this.onCardPress(item)}>
        <Card
          image={isEmpty(item.thumbnailUrl) ? playlistImage : { uri: item.thumbnailUrl }}
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
      const { newsList, errorStatus } = this.props;

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
          {this.renderList(newsList)}
        </ScrollView>
      );
    }
}


const mapStateToProps = (state) => ({
  apiKey: getApiKey(state),
  newsList: getNewsList(state),
  removableTitles: getRemovableTitles(state),
  errorStatus: getErrorStatus(state)
});

function bindAction(dispatch) {
  return {
    loadNewsList: (ids, key, removableTitles) => dispatch(loadNewsList(ids, key, removableTitles)),
    resetNewsList: () => dispatch(resetNewsList())
  };
}

export default connect(mapStateToProps, bindAction)(NewsList);
