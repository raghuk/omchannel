import axios from 'axios';
import { isEmpty, isArray, join, sortedUniq, map } from 'lodash';

import * as types from './constants';
import { SEARCH_SONGS_URL, SEARCH_PLAYLIST_URL, SEARCH_PLAYLIST_ITEMS_URL } from '../../../setup/config';


// Songs
function getSongs() {
  return {
    type: types.SONGS_LOAD
  };
}

function getSongsSuccess(data) {
  return {
    type: types.SONGS_LOAD_SUCCESS,
    data
  };
}

function getSongsFailure(error) {
  return {
    type: types.SONGS_LOAD_FAILURE,
    error
  };
}

export function loadSongs() {
  return (dispatch) => {
    dispatch(getSongs());

    return axios.get(SEARCH_SONGS_URL)
      .then((response) => dispatch(getSongsSuccess(response.data)))
      .catch((err) => dispatch(getSongsFailure(err)));
  };
}

export function resetSongs() {
  return {
    type: types.SONGS_RESET
  };
}


// SongsList
function getSongList() {
  return {
    type: types.SONGLIST_LOAD
  };
}

function getSongListSuccess(data, removableTitles) {
  return {
    type: types.SONGLIST_LOAD_SUCCESS,
    data,
    removableTitles
  };
}

function getSongListFailure(error) {
  return {
    type: types.SONGLIST_LOAD_FAILURE,
    error
  };
}

export function loadSongList(ids = [], apiKey = '', removableTitles = []) {
  let list = map(ids, (id) => id.trim());
  list = (isArray(ids) && !isEmpty(ids)) ? join(sortedUniq(list), ',') : '';
  const url = `${SEARCH_PLAYLIST_URL}?id=${list}&key=${apiKey}&part=snippet,contentDetails&maxResults=50`;

  return (dispatch) => {
    dispatch(getSongList());

    return axios.get(url)
      .then((response) => dispatch(getSongListSuccess(response.data, removableTitles)))
      .catch((err) => dispatch(getSongListFailure(err)));
  };
}

export function resetSongList() {
  return {
    type: types.SONGLIST_RESET
  };
}


// PlayList
function getPlayList() {
  return {
    type: types.SONG_PLAYLIST_LOAD
  };
}

function getPlayListSuccess(data, title, removableTitles) {
  return {
    type: types.SONG_PLAYLIST_LOAD_SUCCESS,
    data,
    title,
    removableTitles
  };
}

function getPlayListFailure(error) {
  return {
    type: types.SONG_PLAYLIST_LOAD_FAILURE,
    error
  };
}

export function loadPlayList(title = '', id = '', apiKey = '', removableTitles = []) {
  const url = `${SEARCH_PLAYLIST_ITEMS_URL}?playlistId=${id}&key=${apiKey}&part=snippet&maxResults=50`;

  return (dispatch) => {
    dispatch(getPlayList());

    return axios.get(url)
      .then((response) => dispatch(getPlayListSuccess(response.data, title, removableTitles)))
      .catch((err) => dispatch(getPlayListFailure(err)));
  };
}

export function resetPlayList() {
  return {
    type: types.SONG_PLAYLIST_RESET
  };
}
