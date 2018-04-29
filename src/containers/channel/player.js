import React, {Component} from 'react';
import {View, WebView} from 'react-native';

import styles from './styles';


class ShowPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            video: this.props.navigation.state.params.video
        };
    }

    render() {
        let url = `https://www.youtube.com/watch?v=${this.state.video.videoId}`;

        return (
            <View style={styles.content}>
                <WebView
                    source={{uri: url}}
                    startInLoadingState
                    scalesPageToFit
                    javaScriptEnabled
                    style={{ flex: 1 }} />
            </View>
        );
    }
}

export default ShowPlayer;
