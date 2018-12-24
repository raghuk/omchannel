import {
  APP_RESET,
  SET_CONNECTION_STATUS
} from './constants';


export function appReset() {
  return {
    type: APP_RESET
  };
}

export function connectionState(connectionInfo) {
  return {
    type: SET_CONNECTION_STATUS,
    connectionInfo
  };
}
