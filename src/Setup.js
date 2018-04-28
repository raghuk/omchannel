import React, {Component} from 'react';
import {connect} from 'react-redux';

import {StatusBar, SafeAreaView} from 'react-native';

import MainNavigator from './Navigator';


class Setup extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#f1f5f8'}}>
                <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.20)" />
                <MainNavigator />
            </SafeAreaView>
        );
    }
}


export default connect(null, null)(Setup);
