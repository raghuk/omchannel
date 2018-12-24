import { combineReducers } from 'redux';

import * as types from './constants';
import { transformShowInfo, transformShowlist, transformShowPlaylist } from './transformers';

const initialState = {
  info: {},
  showlist: [],
  playlist: [],
  error: false
};

const info = (state = initialState.info, action) => {
  switch (action.type) {
    case types.SHOWS_LOAD_SUCCESS:
      return Object.assign({}, state, transformShowInfo(action.data));
    case types.SHOWS_RESET:
      return {};
    default:
      return state;
  }
};

const showlist = (state = initialState.showlist, action) => {
  switch (action.type) {
    case types.SHOWLIST_LOAD_SUCCESS:
      return Object.assign([], state, transformShowlist(action.data, action.removableTitles));
    case types.SHOWLIST_RESET:
      return [];
    default:
      return state;
  }
};

const playlist = (state = initialState.playlist, action) => {
  switch (action.type) {
    case types.SHOW_PLAYLIST_LOAD_SUCCESS:
      return Object.assign([], state, transformShowPlaylist(action.data, action.removableTitles, action.title));
    case types.SHOW_PLAYLIST_RESET:
      return [];
    default:
      return state;
  }
};

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case types.SHOWS_LOAD_FAILURE:
    case types.SHOWLIST_LOAD_FAILURE:
    case types.SHOW_PLAYLIST_LOAD_FAILURE:
      return true;
    case types.SHOWS_LOAD:
    case types.SHOWS_LOAD_SUCCESS:
    case types.SHOWLIST_LOAD:
    case types.SHOWLIST_LOAD_SUCCESS:
    case types.SHOW_PLAYLIST_LOAD:
    case types.SHOW_PLAYLIST_LOAD_SUCCESS:
      return false;
    default:
      return state;
  }
};


// Combine all sub-reducers into one root reducer
const shows = combineReducers({
  info,
  showlist,
  playlist,
  error
});

export default shows;
