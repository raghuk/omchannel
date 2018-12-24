import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

import Player from '../../components/player';
import { Shows, ShowList, ShowPlaylist } from '../../modules/shows';


export default createStackNavigator({
  Shows: {
    screen: Shows,
    path: '/shows',
    navigationOptions: ({ navigation }) => ({
      title: 'Shows',
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
  },
  ShowList: {
    screen: ShowList,
    path: '/shows/list',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.show.title}`,
      headerTintColor: '#f9f9f9',
      headerStyle: {
        backgroundColor: '#372737'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 22, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
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
      title: `${navigation.state.params.playlist.title}`,
      headerTintColor: '#f9f9f9',
      headerStyle: {
        backgroundColor: '#372737'
      },
      headerTitleStyle: {
        color: '#fdfdfd', fontSize: 20, fontWeight: 'normal', fontFamily: 'Opensans', marginHorizontal: 5
      },
      headerBackTitleStyle: {
        color: '#fdfdfd'
      }
    })
  },
  ShowPlayer: {
    screen: Player,
    path: '/show/player',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.video.title}`,
      headerTintColor: '#f9f9f9',
      headerStyle: {
        backgroundColor: '#372737'
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
