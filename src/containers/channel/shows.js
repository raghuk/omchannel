import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, ActivityIndicator, ImageBackground, Text} from 'react-native';

import {isEmpty} from 'lodash';

import {loadShows} from '../../actions/app';
import {getShows} from '../../resources/selectors';

import styles from './styles';


class Shows extends Component {
    static propTypes = {
        shows: PropTypes.arrayOf(PropTypes.object),
        loadShows: PropTypes.func
    }

    static defaultProps = {
        shows: []
    }

    constructor(props) {
        super(props);

        this.state = {
            isReady: false
        };
    }

    componentWillMount() {
        if (isEmpty(this.props.shows)) {
            this.props.loadShows();
        } else {
            console.log('shows already loaded, loading from props');
        }
    }

    componentWillReceiveProps(newProps) {
        console.log('new props available');
        this.setState({ isReady: true });
    }

    renderList = (items) => {
        return (<Text style={styles.title}>Shows</Text>);
    }

    render() {
        const items = this.props.shows;

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
                {this.state.isReady ? this.renderList(items) : loadingInfo}
            </ScrollView>
        );
    }
}


const mapStateToProps = state => ({
    shows: getShows(state)
});

function bindAction(dispatch) {
    return {
        loadShows: () => dispatch(loadShows())
    };
}

export default connect(mapStateToProps, bindAction)(Shows);
