import * as types from './actionTypes';
import {isEmpty, isArray, join, sortedUniq} from 'lodash';


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

export function loadShowList(ids = [], key = '', removableTitles = []) {
    ids = (isArray(ids) && !isEmpty(ids)) ? join(sortedUniq(ids), ',') : '';

    return {
        type: [types.SHOWLIST_LOAD, types.SHOWLIST_LOAD_SUCCESS, types.SHOWLIST_LOAD_FAILURE],
        promise: (sdk) => sdk.getShowList(ids, key),
        removableTitles
    };
}

export function resetShowList() {
    return {
        type: types.SHOWLIST_RESET
    };
}

export function loadPlayList(title = '', id = '', key = '', removableTitles = []) {
    return {
        type: [types.PLAYLIST_LOAD, types.PLAYLIST_LOAD_SUCCESS, types.PLAYLIST_LOAD_FAILURE],
        promise: (sdk) => sdk.getPlayList(id, key),
        title,
        removableTitles
    };
}

export function resetPlayList() {
    return {
        type: types.PLAYLIST_RESET
    };
}
