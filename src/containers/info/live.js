import React, {Component} from 'react';
import {View, WebView} from 'react-native';

import styles from './styles';


class LiveTv extends Component {
    render() {
        let url = 'http://www.apps.omshantitv.org/livetv/';

        return (
            <View style={styles.content}>
                <WebView
                    source={{uri: url}}
                    startInLoadingState
                    scalesPageToFit
                    javaScriptEnabled
                    style={{flex: 1}} />
            </View>
        );
    }
}

export default LiveTv;
