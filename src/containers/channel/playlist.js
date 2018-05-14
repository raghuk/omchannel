import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, ScrollView, ActivityIndicator, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';

import {isEmpty} from 'lodash';

import {loadPlayList, resetPlayList} from '../../actions/channel';
import {getApiKey, getRemovableTitles, getPlayList} from '../../resources/selectors';

import styles from './styles';


class ShowPlaylist extends Component {
    static propTypes = {
        apiKey: PropTypes.string,
        playList: PropTypes.arrayOf(PropTypes.object),
        loadPlayList: PropTypes.func,
        resetPlayList: PropTypes.func
    }

    static defaultProps = {
        apiKey: '',
        playList: [],
        removableTitles: []
    }

    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            playlist: this.props.navigation.state.params.playlist
        };
    }

    componentDidMount() {
        if (isEmpty(this.props.playList)) {
            this.props.loadPlayList(this.state.playlist.id, this.props.apiKey, this.props.removableTitles);
        } else {
            console.log('play list already loaded, loading from props');
            this.setState({ isReady: true });
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ isReady: true });
    }

    componentWillUnmount() {
        this.props.resetPlayList();
    }

    _onCardPress = (item) => {
        this.props.navigation.navigate('ShowPlayer', {video: item});
    }

    _renderList = (items) => {
        return (
            <View style={styles.listView}>
                {items.map(i => this._renderItem(i))}
            </View>
        );
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity key={item.id} onPress={() => this._onCardPress(item)}>
                <Card
                    image={{uri: item.thumbnailUrl}}
                    imageStyle={styles.cardImage}
                    containerStyle={[styles.cardContainer, styles.cardHeight]}>
                    <Text numberOfLines={3} style={styles.cardSubtitle}>{item.title}</Text>
                </Card>
            </TouchableOpacity>
        );
    }

    render() {
        const items = this.props.playList;

        let loadingInfo = (
            <ImageBackground
                imageStyle={{resizeMode: 'cover'}}
                style={{flex: 1, justifyContent: 'center'}}
                source={require('../../../assets/images/loader.png')}>
                <ActivityIndicator size="large" color="#5C5679" />
            </ImageBackground>
        );

        return (
            <ScrollView style={styles.content}>
                {this.state.isReady ? this._renderList(items) : loadingInfo}
            </ScrollView>
        );
    }
}


const mapStateToProps = state => ({
    apiKey: getApiKey(state),
    playList: getPlayList(state),
    removableTitles: getRemovableTitles(state)
});

function bindAction(dispatch) {
    return {
        loadPlayList: (id, key, removableTitles) => dispatch(loadPlayList(id, key, removableTitles)),
        resetPlayList: () => dispatch(resetPlayList())
    };
}

export default connect(mapStateToProps, bindAction)(ShowPlaylist);
