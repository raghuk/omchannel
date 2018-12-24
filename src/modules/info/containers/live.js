import React, { Component } from 'react';
import { View, WebView, Alert, NetInfo } from 'react-native';

import styles from './styles';


class LiveTv extends Component {
  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (!isConnected) {
        Alert.alert(
          'Internet Error',
          'Please check your internet connection and try again later.',
          [{ text: 'OK', onPress: () => console.log('OK') }],
          { cancelable: false }
        );
      }
      return isConnected;
    }).catch((e) => { console.log(e); });
  }

  render() {
    const url = 'http://www.apps.omshantitv.org/livetv/';

    return (
      <View style={styles.content}>
        <WebView
          source={{ uri: url }}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default LiveTv;
