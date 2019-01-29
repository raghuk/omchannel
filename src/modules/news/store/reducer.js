import { combineReducers } from 'redux';

import * as types from './constants';
import { transformNewsInfo, transformNewslist, transformNewsPlaylist } from './transformers';

const initialState = {
  info: {},
  newslist: [],
  playlist: [],
  error: false
};

const info = (state = initialState.info, action) => {
  switch (action.type) {
    case types.NEWS_LOAD_SUCCESS:
      return Object.assign({}, transformNewsInfo(action.data));
    case types.NEWS_RESET:
      return {};
    default:
      return state;
  }
};

const newslist = (state = initialState.newslist, action) => {
  switch (action.type) {
    case types.NEWSLIST_LOAD_SUCCESS:
      return Object.assign([], transformNewslist(action.data, action.removableTitles));
    case types.NEWSLIST_RESET:
      return [];
    default:
      return state;
  }
};

const playlist = (state = initialState.playlist, action) => {
  switch (action.type) {
    case types.NEWS_PLAYLIST_LOAD_SUCCESS:
      return Object.assign([], transformNewsPlaylist(action.data, action.removableTitles, action.title));
    case types.NEWS_PLAYLIST_RESET:
      return [];
    default:
      return state;
  }
};

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case types.NEWS_LOAD_FAILURE:
    case types.NEWSLIST_LOAD_FAILURE:
    case types.NEWS_PLAYLIST_LOAD_FAILURE:
      return true;
    case types.NEWS_LOAD:
    case types.NEWS_LOAD_SUCCESS:
    case types.NEWSLIST_LOAD:
    case types.NEWSLIST_LOAD_SUCCESS:
    case types.NEWS_PLAYLIST_LOAD:
    case types.NEWS_PLAYLIST_LOAD_SUCCESS:
      return false;
    default:
      return state;
  }
};


// Combine all sub-reducers into one root reducer
const news = combineReducers({
  info,
  newslist,
  playlist,
  error
});

export default news;
