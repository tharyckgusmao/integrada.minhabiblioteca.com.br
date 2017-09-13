
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './reducers/auth.js';

const rootReducer = combineReducers({
  routing,
  auth
});

export default rootReducer;
