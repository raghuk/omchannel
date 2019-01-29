import React from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Dimensions, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import Sidebar from '../components/sidebar';

import Home from '../modules/home';
import { About, LiveTv } from '../modules/info';
import NewsTab from './stacks/news';
import ShowsTab from './stacks/show';
import SongsTab from './stacks/song';

const deviceWidth = Dimensions.get('window').width;

const AboutTab = createStackNavigator({
  About: {
    screen: About,
    path: '/about',
    navigationOptions: ({ navigation }) => ({
      title: 'About Us',
      headerTintColor: '#f9f9f9',
      headerLeft: (
        <Button
          title=""
          buttonStyle={{ backgroundColor: '#372737', padding: 4 }}
          icon={{ name: 'md-menu', type: 'ionicon', color: '#fdfdfd', size: 24 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerStyle: {
        backgroundColor: '#372737'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 22, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      }
    })
  }
});

const LiveTab = createStackNavigator({
  LiveTv: {
    screen: LiveTv,
    path: '/live',
    navigationOptions: ({ navigation }) => ({
      title: 'Godlywood Studio - Live',
      headerTintColor: '#f9f9f9',
      headerLeft: (
        <Button
          title=""
          buttonStyle={{ backgroundColor: '#372737', padding: 4 }}
          icon={{ name: 'md-menu', type: 'ionicon', color: '#fdfdfd', size: 24 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerStyle: {
        backgroundColor: '#372737'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 22, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      }
    })
  }
});

const HomeTab = createStackNavigator({
  Home: {
    screen: Home,
    path: '/home',
    navigationOptions: ({ navigation }) => ({
      title: 'Om Shanti Channel',
      headerTintColor: '#f9f9f9',
      headerLeft: (
        <Button
          title=""
          buttonStyle={{ backgroundColor: '#372737', padding: 4 }}
          icon={{ name: 'md-menu', type: 'ionicon', color: '#fdfdfd', size: 24 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerStyle: {
        backgroundColor: '#372737'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 22, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      }
    })
  }
});


const MainNavigator = createDrawerNavigator(
  {
    HomeTab: {
      screen: HomeTab,
      path: '/home',
      navigationOptions: () => ({
        drawerLabel: 'Home',
        drawerIcon: <Icon name="ios-home" type="ionicon" color="#372737" size={28} />
      })
    },
    LiveTab: {
      screen: LiveTab,
      path: '/live',
      navigationOptions: () => ({
        drawerLabel: 'Live TV',
        drawerIcon: <Icon name="ios-videocam" type="ionicon" color="#372737" size={28} />
      })
    },
    ShowsTab: {
      screen: ShowsTab,
      path: '/shows',
      navigationOptions: () => ({
        drawerLabel: 'Shows',
        drawerIcon: <Icon name="ios-film" type="ionicon" color="#372737" size={28} />
      })
    },
    SongsTab: {
      screen: SongsTab,
      path: '/songs',
      navigationOptions: () => ({
        drawerLabel: 'Songs',
        drawerIcon: <Icon name="ios-musical-notes" type="ionicon" color="#372737" size={28} />
      })
    },
    NewsTab: {
      screen: NewsTab,
      path: '/news',
      navigationOptions: () => ({
        drawerLabel: 'News',
        drawerIcon: <Icon name="ios-paper" type="ionicon" color="#372737" size={28} />
      })
    },
    AboutTab: {
      screen: AboutTab,
      path: '/about',
      navigationOptions: () => ({
        drawerLabel: 'About Us',
        drawerIcon: <Icon name="md-ribbon" type="ionicon" color="#372737" size={28} />
      })
    }
  },
  {
    drawerWidth: deviceWidth * 0.75,
    drawerPosition: 'left',
    initialRouteName: 'HomeTab',
    contentComponent: (props) => <View style={{ flex: 1 }}><Sidebar {...props} /></View>,
    drawerBackgroundColor: '#fdfdfd'
  }
);

export default createAppContainer(MainNavigator);
