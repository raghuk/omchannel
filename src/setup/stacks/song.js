import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

import Player from '../../components/player';
import { Songs, SongList, SongPlaylist } from '../../modules/songs';


export default createStackNavigator({
  Songs: {
    screen: Songs,
    path: '/songs',
    navigationOptions: ({ navigation }) => ({
      title: 'Songs',
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
  SongList: {
    screen: SongList,
    path: '/songs/list',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.song.title}`,
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
  SongPlaylist: {
    screen: SongPlaylist,
    path: '/songs/list/info',
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
  SongPlayer: {
    screen: Player,
    path: '/song/player',
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
