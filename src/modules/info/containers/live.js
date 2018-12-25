import React, { Component } from 'react';
import { View, Alert, NetInfo, Dimensions } from 'react-native';

import { Video, ScreenOrientation } from 'expo';
import VideoPlayer from '@expo/videoplayer';

import { WEBCAST_LIVE_URL } from '../../../setup/config';
import styles from './styles';


class LiveTv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPortrait: true,
      showControls: false
    };
  }

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
    Dimensions.addEventListener('change', this.orientationChangeHandler);
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    Dimensions.removeEventListener('change', this.orientationChangeHandler);
  }

  orientationChangeHandler = (dimensions) => {
    const { width, height } = dimensions.window;
    const isLandscape = width > height;

    this.setState({ isPortrait: !isLandscape });
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  }

  switchToLandscape = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  switchToPortrait = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    const { isPortrait, showControls } = this.state;

    return (
      <View style={styles.container}>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: WEBCAST_LIVE_URL
            }
          }}
          showControlsOnLoad={showControls}
          isPortrait={isPortrait}
          switchToLandscape={this.switchToLandscape}
          switchToPortrait={this.switchToPortrait}
          playFromPositionMillis={0}
        />
      </View>
    );
  }
}

export default LiveTv;
