import * as types from './actionTypes';
import {isEmpty, isArray, join} from 'lodash';


export function loadShows() {
    return {
        type: [types.INFO_LOAD, types.INFO_LOAD_SUCCESS, types.INFO_LOAD_FAILURE],
        promise: (sdk) => sdk.getShows()
    };
}

export function resetShows() {
    return {
        type: types.INFO_RESET
    };
}

export function loadShowList(ids = [], key = '') {
    ids = (isArray(ids) && !isEmpty(ids)) ? join(ids, ',') : '';

    return {
        type: [types.SHOWLIST_LOAD, types.SHOWLIST_LOAD_SUCCESS, types.SHOWLIST_LOAD_FAILURE],
        promise: (sdk) => sdk.getShowList(ids, key)
    };
}

export function resetShowList() {
    return {
        type: types.SHOWLIST_RESET
    };
}

export function loadPlayList(id = '', key = '') {
    return {
        type: [types.PLAYLIST_LOAD, types.PLAYLIST_LOAD_SUCCESS, types.PLAYLIST_LOAD_FAILURE],
        promise: (sdk) => sdk.getPlayList(id, key)
    };
}

export function resetPlayList() {
    return {
        type: types.PLAYLIST_RESET
    };
}
