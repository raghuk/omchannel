import React, { PureComponent } from 'react';
import { Platform, View, WebView } from 'react-native';
import { ScreenOrientation, WebBrowser } from 'expo';
import { Button } from 'react-native-elements';

import styles from './styles';


class Player extends PureComponent {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const video = navigation.state.params.video;

    this.url = `https://www.youtube.com/embed/${video.videoId}`;
  }

  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  handleLaunch = () => {
    WebBrowser.openBrowserAsync(this.url);
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.content}>
          <Button
            raised
            containerViewStyle={{ width: '85%', paddingLeft: 20, paddingRight: 15, backgroundColor: '#8AC24A', borderRadius: 5 }}
            textStyle={{ textAlign: 'center' }}
            backgroundColor="#8AC24A"
            fontSize={20}
            fontFamily="Titillium"
            icon={{ name: 'logo-youtube', size: 32, type: 'ionicon' }}
            title="Please click here to watch the video."
            onPress={() => this.handleLaunch()}
          />
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <WebView
          source={{ uri: this.url }}
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
