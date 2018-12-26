import axios from 'axios';
import { isEmpty, isArray, join, sortedUniq, map } from 'lodash';

import * as types from './constants';
import { SEARCH_SHOWS_URL, SEARCH_PLAYLIST_URL, SEARCH_PLAYLIST_ITEMS_URL } from '../../../setup/config';


// Shows
function getShows() {
  return {
    type: types.SHOWS_LOAD
  };
}

function getShowsSuccess(data) {
  return {
    type: types.SHOWS_LOAD_SUCCESS,
    data
  };
}

function getShowsFailure(error) {
  return {
    type: types.SHOWS_LOAD_FAILURE,
    error
  };
}

export function loadShows() {
  return (dispatch) => {
    dispatch(getShows());

    return axios.get(SEARCH_SHOWS_URL)
      .then((response) => dispatch(getShowsSuccess(response.data)))
      .catch((err) => dispatch(getShowsFailure(err)));
  };
}

export function resetShows() {
  return {
    type: types.SHOWS_RESET
  };
}


// ShowsList
function getShowList() {
  return {
    type: types.SHOWLIST_LOAD
  };
}

function getShowListSuccess(data, removableTitles) {
  return {
    type: types.SHOWLIST_LOAD_SUCCESS,
    data,
    removableTitles
  };
}

function getShowListFailure(error) {
  return {
    type: types.SHOWLIST_LOAD_FAILURE,
    error
  };
}

export function loadShowList(ids = [], apiKey = '', removableTitles = []) {
  let list = map(ids, (id) => id.trim());
  list = (isArray(ids) && !isEmpty(ids)) ? join(sortedUniq(list), ',') : '';
  const url = `${SEARCH_PLAYLIST_URL}?id=${list}&key=${apiKey}&part=snippet,contentDetails&maxResults=50`;

  return (dispatch) => {
    dispatch(getShowList());

    return axios.get(url)
      .then((response) => dispatch(getShowListSuccess(response.data, removableTitles)))
      .catch((err) => dispatch(getShowListFailure(err)));
  };
}

export function resetShowList() {
  return {
    type: types.SHOWLIST_RESET
  };
}


// PlayList
function getShowPlayList() {
  return {
    type: types.SHOW_PLAYLIST_LOAD
  };
}

function getShowPlayListSuccess(data, title, removableTitles) {
  return {
    type: types.SHOW_PLAYLIST_LOAD_SUCCESS,
    data,
    title,
    removableTitles
  };
}

function getShowPlayListFailure(error) {
  return {
    type: types.SHOW_PLAYLIST_LOAD_FAILURE,
    error
  };
}

export function loadShowPlayList(title = '', id = '', apiKey = '', removableTitles = []) {
  const url = `${SEARCH_PLAYLIST_ITEMS_URL}?playlistId=${id}&key=${apiKey}&part=snippet&maxResults=50`;

  return (dispatch) => {
    dispatch(getShowPlayList());

    return axios.get(url)
      .then((response) => dispatch(getShowPlayListSuccess(response.data, title, removableTitles)))
      .catch((err) => dispatch(getShowPlayListFailure(err)));
  };
}

export function resetShowPlayList() {
  return {
    type: types.SHOW_PLAYLIST_RESET
  };
}
