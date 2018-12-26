import React, { Component } from 'react';
import { View, Alert, NetInfo, DeviceEventEmitter } from 'react-native';
import { Video, ScreenOrientation } from 'expo';

import { WEBCAST_LIVE_URL } from '../../../setup/config';
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

    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    this.routeSubscription = DeviceEventEmitter.addListener('routeStateChanged', this.onRouteStateChanged);
  }

  componentWillUnmount() {
    this.routeSubscription.remove();
  }

  onRouteStateChanged = (route) => {
    const { navigation } = this.props;
    if (navigation.state.routeName === route.routeName && navigation.state.key === route.key) {
      this.videoRef.playAsync();
      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    } else {
      this.videoRef.stopAsync();
      ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          ref={(component) => { this.videoRef = component; }}
          source={{ uri: WEBCAST_LIVE_URL }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_COVER}
          shouldPlay
          useNativeControls
          style={styles.videoPlayer}
        />
      </View>
    );
  }
}

export default LiveTv;
