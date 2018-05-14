import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, ScrollView, ActivityIndicator, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';

import {isEmpty} from 'lodash';

import {loadShowList, resetShowList} from '../../actions/channel';
import {getApiKey, getRemovableTitles, getShowList} from '../../resources/selectors';

import styles from './styles';


class ShowList extends Component {
    static propTypes = {
        apiKey: PropTypes.string,
        showList: PropTypes.arrayOf(PropTypes.object),
        removableTitles: PropTypes.array,
        loadShowList: PropTypes.func,
        resetShowList: PropTypes.func
    }

    static defaultProps = {
        apiKey: '',
        showList: [],
        removableTitles: []
    }

    constructor(props) {
        super(props);

        this.state = {
            isReady: false
        };
    }

    componentDidMount() {
        let ids = this.props.navigation.state.params.show.playlists || [];

        if (isEmpty(this.props.showList)) {
            this.props.loadShowList(ids, this.props.apiKey, this.props.removableTitles);
        } else {
            console.log('show list already loaded, loading from props');
            this.setState({ isReady: true });
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ isReady: true });
    }

    componentWillUnmount() {
        this.props.resetShowList();
    }

    _onCardPress = (item) => {
        this.props.navigation.navigate('ShowPlaylist', {playlist: item});
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
                    <Text numberOfLines={2} style={styles.cardTitle}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.cardSubtitle}>{item.count} Episodes</Text>
                </Card>
            </TouchableOpacity>
        );
    }

    render() {
        const items = this.props.showList;

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
    showList: getShowList(state),
    removableTitles: getRemovableTitles(state)
});

function bindAction(dispatch) {
    return {
        loadShowList: (ids, key, removableTitles) => dispatch(loadShowList(ids, key, removableTitles)),
        resetShowList: () => dispatch(resetShowList())
    };
}

export default connect(mapStateToProps, bindAction)(ShowList);
