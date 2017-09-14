
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './reducers/auth.js';
import ebooks from './reducers/ebooks.js';

const rootReducer = combineReducers({
  routing,
  auth,
  ebooks
});

export default rootReducer;
