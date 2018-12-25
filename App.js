/* eslint-disable global-require */
import React, { Component } from 'react';
import { AppLoading, Asset, Font, Icon } from 'expo';

import Main from './src';


class App extends Component {
  state = {
    isLoadingComplete: false
  };

  _loadResourcesAsync = async () => (
    Promise.all([
      Asset.loadAsync([
        require('./assets/images/drawer-cover.png'),
        require('./assets/images/loader.png'),
        require('./assets/images/logo-cover.png'),
        require('./assets/images/player.jpg'),
        require('./assets/images/splash.png')
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        Opensans: require('./assets/fonts/Opensans.ttf'),
        Titillium: require('./assets/fonts/Titillium.ttf')
      })
    ])
  )

  _handleLoadingError = (error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return <Main />;
  }
}

export default App;
