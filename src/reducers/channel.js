import {combineReducers} from 'redux';

import * as types from '../actions/actionTypes';
import {transformInfo} from '../resources/transforms';

const initialState = {
    info: {},
    error: null
};

const info = (state = initialState.info, action) => {
    switch (action.type) {
        case types.INFO_LOAD_SUCCESS:
            return Object.assign({}, state, transformInfo(action.result));
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
const channel = combineReducers({
    info,
    error
});

export default channel;
