import axios from 'axios';
import { isEmpty, isArray, join, sortedUniq, map } from 'lodash';

import * as types from './constants';
import { SEARCH_NEWS_URL, SEARCH_PLAYLIST_URL, SEARCH_PLAYLIST_ITEMS_URL } from '../../../setup/config';


// News Load
function getNews() {
  return {
    type: types.NEWS_LOAD
  };
}

function getNewsSuccess(data) {
  return {
    type: types.NEWS_LOAD_SUCCESS,
    data
  };
}

function getNewsFailure(error) {
  return {
    type: types.NEWS_LOAD_FAILURE,
    error
  };
}

export function loadNews() {
  return (dispatch) => {
    dispatch(getNews());

    return axios.get(SEARCH_NEWS_URL)
      .then((response) => dispatch(getNewsSuccess(response.data)))
      .catch((err) => dispatch(getNewsFailure(err)));
  };
}

export function resetNews() {
  return {
    type: types.NEWS_RESET
  };
}


// News List
function getNewsList() {
  return {
    type: types.NEWSLIST_LOAD
  };
}

function getNewsListSuccess(data, removableTitles) {
  return {
    type: types.NEWSLIST_LOAD_SUCCESS,
    data,
    removableTitles
  };
}

function getNewsListFailure(error) {
  return {
    type: types.NEWSLIST_LOAD_FAILURE,
    error
  };
}

export function loadNewsList(ids = [], apiKey = '', removableTitles = []) {
  let list = map(ids, (id) => id.trim());
  list = (isArray(ids) && !isEmpty(ids)) ? join(sortedUniq(list), ',') : '';
  const url = `${SEARCH_PLAYLIST_URL}?id=${list}&key=${apiKey}&part=snippet,contentDetails&maxResults=50`;

  return (dispatch) => {
    dispatch(getNewsList());

    return axios.get(url)
      .then((response) => dispatch(getNewsListSuccess(response.data, removableTitles)))
      .catch((err) => dispatch(getNewsListFailure(err)));
  };
}

export function resetNewsList() {
  return {
    type: types.NEWSLIST_RESET
  };
}


// News PlayList
function getNewsPlayList() {
  return {
    type: types.NEWS_PLAYLIST_LOAD
  };
}

function getNewsPlayListSuccess(data, title, removableTitles) {
  return {
    type: types.NEWS_PLAYLIST_LOAD_SUCCESS,
    data,
    title,
    removableTitles
  };
}

function getNewsPlayListFailure(error) {
  return {
    type: types.NEWS_PLAYLIST_LOAD_FAILURE,
    error
  };
}

export function loadNewsPlayList(title = '', id = '', apiKey = '', removableTitles = []) {
  const url = `${SEARCH_PLAYLIST_ITEMS_URL}?playlistId=${id}&key=${apiKey}&part=snippet&maxResults=50`;

  return (dispatch) => {
    dispatch(getNewsPlayList());

    return axios.get(url)
      .then((response) => dispatch(getNewsPlayListSuccess(response.data, title, removableTitles)))
      .catch((err) => dispatch(getNewsPlayListFailure(err)));
  };
}

export function resetNewsPlayList() {
  return {
    type: types.NEWS_PLAYLIST_RESET
  };
}
