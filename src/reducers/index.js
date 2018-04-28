import {combineReducers} from 'redux';

import app from './app';
import channel from './channel';


export default combineReducers({
    app,
    channel
});
