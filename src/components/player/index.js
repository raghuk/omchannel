import React, { PureComponent } from 'react';
import { View, WebView } from 'react-native';

import styles from './styles';


class Player extends PureComponent {
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
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default Player;
