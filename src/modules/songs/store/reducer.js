import { combineReducers } from 'redux';

import * as types from './constants';
import { transformSongInfo, transformSonglist, transformSongPlaylist } from './transformers';

const initialState = {
  info: {},
  songlist: [],
  playlist: [],
  error: false
};

const info = (state = initialState.info, action) => {
  switch (action.type) {
    case types.SONGS_LOAD_SUCCESS:
      return Object.assign({}, transformSongInfo(action.data));
    case types.SONGS_RESET:
      return {};
    default:
      return state;
  }
};

const songlist = (state = initialState.songlist, action) => {
  switch (action.type) {
    case types.SONGLIST_LOAD_SUCCESS:
      return Object.assign([], transformSonglist(action.data, action.removableTitles));
    case types.SONGLIST_RESET:
      return [];
    default:
      return state;
  }
};

const playlist = (state = initialState.playlist, action) => {
  switch (action.type) {
    case types.SONG_PLAYLIST_LOAD_SUCCESS:
      return Object.assign([], transformSongPlaylist(action.data, action.removableTitles, action.title));
    case types.SONG_PLAYLIST_RESET:
      return [];
    default:
      return state;
  }
};

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case types.SONGS_LOAD_FAILURE:
    case types.SONGLIST_LOAD_FAILURE:
    case types.SONG_PLAYLIST_LOAD_FAILURE:
      return true;
    case types.SONGS_LOAD:
    case types.SONGS_LOAD_SUCCESS:
    case types.SONGLIST_LOAD:
    case types.SONGLIST_LOAD_SUCCESS:
    case types.SONG_PLAYLIST_LOAD:
    case types.SONG_PLAYLIST_LOAD_SUCCESS:
      return false;
    default:
      return state;
  }
};


// Combine all sub-reducers into one root reducer
const songs = combineReducers({
  info,
  songlist,
  playlist,
  error
});

export default songs;
