import React, { PureComponent } from 'react';
import { View, WebView } from 'react-native';
import { ScreenOrientation } from 'expo';

import styles from './styles';


class Player extends PureComponent {
  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    const { navigation } = this.props;

    const video = navigation.state.params.video;
    const url = `https://www.youtube.com/embed/${video.videoId}`;

    return (
      <View style={styles.content}>
        <WebView
          source={{ uri: url }}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          style={styles.webView}
        />
      </View>
    );
  }
}

export default Player;
