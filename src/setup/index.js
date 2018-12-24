import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Platform, StatusBar, SafeAreaView, ImageBackground, NetInfo } from 'react-native';

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

    return (
      <SafeAreaView style={styles.droidSafeArea} forceInset={{ top: 'top', horizontal: 'never' }}>
        { Platform.OS === 'ios' && <StatusBar translucent barStyle="dark-content" backgroundColor="#ecf0f1" /> }
        { isReady ? <MainNavigator uriPrefix="/oschannel" /> : loadingInfo }
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Setup);
