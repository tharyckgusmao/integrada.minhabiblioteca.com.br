import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import mainReducer from '../reducers/mainReducer';




const actionCreators = {
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(browserHistory);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionCreators,
  }) :
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

export default function configureStore(initialState) {
  const store = createStore(mainReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers/mainReducer', () =>
      store.replaceReducer(require('../reducers/mainReducer'))
    );
  }

  return store;
}
