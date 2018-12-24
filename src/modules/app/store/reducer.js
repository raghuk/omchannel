import { combineReducers } from 'redux';
import { SET_CONNECTION_STATUS } from './constants';


const initialState = {
  connectionInfo: {}
};

const connectionInfo = (state = initialState.connectionInfo, action) => {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return action.connectionInfo;
    default:
      return state;
  }
};


// Combine all sub-reducers into one root reducer
const reducer = combineReducers({
  connectionInfo
});

export default reducer;
