import {combineReducers} from 'redux';

import * as types from '../actions/actionTypes';
import {transformInfo} from '../resources/transforms';

const initialState = {
    isFetching: 0,
    appInfo: {},
    error: null
};

const isFetching = (state = initialState.isFetching, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return state + 1;
        case types.HIDE_LOADER:
            return state > 0 ? state - 1 : 0;
        default:
            return state;
    }
};

const appInfo = (state = initialState.appInfo, action) => {
    switch (action.type) {
        case types.INFO_LOAD_SUCCESS:
            return { ...state, content: transformInfo(action.result) };
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.INFO_LOAD_FAILURE:
            return action.error;
        case types.INFO_LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};


// Combine all sub-reducers into one root reducer
const app = combineReducers({
    isFetching,
    appInfo,
    error
});

export default app;
