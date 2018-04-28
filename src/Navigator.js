import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';

import {Dimensions, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import Sidebar from './components/sidebar';
import {About} from './containers/info';
import {Shows, ShowList, ShowPlaylist} from './containers/channel';


const deviceWidth = Dimensions.get('window').width;

const ChannelTab = StackNavigator({
    Shows: {
        screen: Shows,
        path: '/shows',
        navigationOptions: ({ navigation }) => ({
            title: 'Shows',
            headerTintColor: '#f9f9f9',
            headerLeft: (
                <Button
                    title=''
                    large={true}
                    buttonStyle={{backgroundColor: '#00838f', padding: 3}}
                    icon={{name: 'md-menu', type: 'ionicon', color: '#fdfdfd'}}
                    onPress={() => navigation.navigate('DrawerOpen')} />
            ),
            headerStyle: {
                backgroundColor: '#00838f'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
            }
        })
    },
    ShowList: {
        screen: ShowList,
        path: '/shows/list',
        navigationOptions: ({ navigation }) => ({
            title: 'Branches List',
            headerTintColor: '#f9f9f9',
            headerStyle: {
                backgroundColor: '#00838f'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
            },
            headerBackTitleStyle: {
                color: '#fdfdfd'
            }
        })
    },
    ShowPlaylist: {
        screen: ShowPlaylist,
        path: '/shows/list/info',
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.branch.name}`,
            headerTintColor: '#f9f9f9',
            headerStyle: {
                backgroundColor: '#00838f'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
            },
            headerBackTitleStyle: {
                color: '#fdfdfd'
            }
        })
    }
});

const AboutTab = StackNavigator({
    Contact: {
        screen: About,
        path: '/about',
        navigationOptions: ({ navigation }) => ({
            title: 'About Us',
            headerTintColor: '#f9f9f9',
            headerLeft: (
                <Button
                    title=''
                    large={true}
                    buttonStyle={{backgroundColor: '#00838f', padding: 3}}
                    icon={{name: 'md-menu', type: 'ionicon', color: '#fdfdfd'}}
                    onPress={() => navigation.navigate('DrawerOpen')} />
            ),
            headerStyle: {
                backgroundColor: '#00838f'
            },
            headerTitleStyle: {
                color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
            }
        })
    }
});


const MainNavigator = DrawerNavigator(
    {
        ChannelTab: {
            screen: ChannelTab,
            path: '/shows',
            navigationOptions: () => ({
                drawerLabel: 'Home',
                drawerIcon: <Icon name='ios-home' type='ionicon' color='#00838f' size={30} />
            })
        },
        AboutTab: {
            screen: AboutTab,
            path: '/about',
            navigationOptions: () => ({
                drawerLabel: 'About Us',
                drawerIcon: <Icon name='md-ribbon' type='ionicon' color='#00838f' size={28} />
            })
        }
    },
    {
        drawerWidth: deviceWidth * 0.82,
        drawerPosition: 'left',
        initialRouteName: 'ChannelTab',
        contentComponent: (props) => <View style={{flex: 1}}><Sidebar {...props} /></View>,
        drawerBackgroundColor: '#fdfdfd'
    }
);

export default MainNavigator;
