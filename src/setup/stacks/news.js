import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

import Player from '../../components/player';
import { News, NewsList, NewsPlaylist } from '../../modules/news';


export default createStackNavigator({
  News: {
    screen: News,
    path: '/news',
    navigationOptions: ({ navigation }) => ({
      title: 'News',
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
  NewsList: {
    screen: NewsList,
    path: '/news/list',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.news.title}`,
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
  NewsPlaylist: {
    screen: NewsPlaylist,
    path: '/news/list/info',
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
  NewsPlayer: {
    screen: Player,
    path: '/news/player',
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
