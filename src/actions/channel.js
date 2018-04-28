import * as types from './actionTypes';


export function loadShows() {
    return {
        type: [types.INFO_LOAD, types.INFO_LOAD_SUCCESS, types.INFO_LOAD_FAILURE],
        promise: (sdk) => sdk.getShows(),
        loader: true
    };
}
