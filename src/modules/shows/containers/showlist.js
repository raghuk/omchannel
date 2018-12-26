import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';

import { loadShowList, resetShowList } from '../store/actions';
import { getApiKey, getRemovableTitles, getShowList, getErrorStatus } from '../store/selectors';

import styles from './styles';

const loaderImage = require('../../../../assets/images/loader.png');


class ShowList extends Component {
    static propTypes = {
      apiKey: PropTypes.string,
      showList: PropTypes.arrayOf(PropTypes.object),
      removableTitles: PropTypes.arrayOf(PropTypes.string),
      errorStatus: PropTypes.bool,
      loadShowList: PropTypes.func.isRequired,
      resetShowList: PropTypes.func.isRequired
    }

    static defaultProps = {
      apiKey: '',
      showList: [],
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
      const { apiKey, removableTitles, loadShowList, navigation } = this.props;
      const ids = navigation.state.params.show.playlists || [];

      loadShowList(ids, apiKey, removableTitles);
    }

    componentWillReceiveProps() {
      const { isReady } = this.state;
      if (!isReady) {
        this.setState({ isReady: true });
      }
    }

    componentWillUnmount() {
      const { resetShowList } = this.props;
      resetShowList();
    }

    onCardPress = (item) => {
      const { navigation } = this.props;
      navigation.navigate('ShowPlaylist', { playlist: item });
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
      const { showList, errorStatus } = this.props;

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
          {this.renderList(showList)}
        </ScrollView>
      );
    }
}


const mapStateToProps = (state) => ({
  apiKey: getApiKey(state),
  showList: getShowList(state),
  removableTitles: getRemovableTitles(state),
  errorStatus: getErrorStatus(state)
});

function bindAction(dispatch) {
  return {
    loadShowList: (ids, key, removableTitles) => dispatch(loadShowList(ids, key, removableTitles)),
    resetShowList: () => dispatch(resetShowList())
  };
}

export default connect(mapStateToProps, bindAction)(ShowList);
