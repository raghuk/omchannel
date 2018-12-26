import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatusBar, SafeAreaView, ImageBackground, NetInfo, DeviceEventEmitter } from 'react-native';

import MainNavigator from './navigation';
import { actions as appActions } from '../modules/app';

import styles from './styles';

const splashImage = require('../../assets/images/splash.png');

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);

    setTimeout(() => this.setState({ isReady: true }), 2000);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (connectionInfo) => {
    // eslint-disable-next-line react/prop-types
    const { appActions } = this.props;
    appActions.connectionState(connectionInfo);
  }

  render() {
    const { isReady } = this.state;

    const loadingInfo = (
      <ImageBackground
        imageStyle={{ resizeMode: 'cover' }}
        style={{ flex: 1, justifyContent: 'center' }}
        source={splashImage}
      />
    );

    const AppRouter = (
      <MainNavigator
        uriPrefix="/oschannel"
        onNavigationStateChange={(prevState, currentState) => {
          let route = currentState;
          while (route.routes) {
            route = route.routes[route.index];
          }
          DeviceEventEmitter.emit('routeStateChanged', route);
        }}
      />
    );

    return (
      <SafeAreaView style={styles.droidSafeArea} forceInset={{ top: 'top', horizontal: 'never' }}>
        <StatusBar translucent barStyle="dark-content" backgroundColor="#373737" />
        { isReady ? AppRouter : loadingInfo }
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Setup);
