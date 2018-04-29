import {combineReducers} from 'redux';

import * as types from '../actions/actionTypes';
import {transformInfo, transformShowlist, transformPlaylist} from '../resources/transforms';

const initialState = {
    info: {},
    showlist: [],
    playlist: [],
    error: null
};

const info = (state = initialState.info, action) => {
    switch (action.type) {
        case types.INFO_LOAD_SUCCESS:
            return Object.assign({}, state, transformInfo(action.result));
        case types.INFO_RESET:
            return {};
        default:
            return state;
    }
};

const showlist = (state = initialState.showlist, action) => {
    switch (action.type) {
        case types.SHOWLIST_LOAD_SUCCESS:
            return Object.assign([], state, transformShowlist(action.result));
        case types.SHOWLIST_RESET:
            return [];
        default:
            return state;
    }
};

const playlist = (state = initialState.playlist, action) => {
    switch (action.type) {
        case types.PLAYLIST_LOAD_SUCCESS:
            return Object.assign([], state, transformPlaylist(action.result));
        case types.PLAYLIST_RESET:
            return [];
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.INFO_LOAD_FAILURE:
        case types.SHOWLIST_LOAD_FAILURE:
        case types.PLAYLIST_LOAD_FAILURE:
            return action.error;
        case types.INFO_LOAD_SUCCESS:
        case types.SHOWLIST_LOAD_SUCCESS:
        case types.PLAYLIST_LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};


// Combine all sub-reducers into one root reducer
const channel = combineReducers({
    info,
    showlist,
    playlist,
    error
});

export default channel;
