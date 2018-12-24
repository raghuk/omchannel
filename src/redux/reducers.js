import { combineReducers } from 'redux';

import { reducer as app } from '../modules/app';
import { reducer as shows } from '../modules/shows';
import { reducer as songs } from '../modules/songs';


export default combineReducers({
  app,
  shows,
  songs
});
