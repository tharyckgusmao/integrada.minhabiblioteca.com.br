import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Router, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';


import {routes} from './routes/routes';
import configureStore from './store/configureStore';
import '!!style-loader!css-loader!./assets/styles/global.css';
import '!!style-loader!css-loader!./assets/styles/fonts.css';

import Root from './containers/Root';


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);



const root =  document.getElementById('root');

  ReactDOM.render(
    <AppContainer>
      <Root store={store} history={history} routes={routes}></Root>
    </AppContainer>,
  root
  );



if (module.hot) {

  module.hot.accept('./routes/routes', () => {

    const NextRoot = require('./containers/Root').default;
    const NextRoutes = require('./routes/routes').routes;


    ReactDOM.render(
      <AppContainer>
          <NextRoot store={store} history={history} routes={routes}></NextRoot>
     </AppContainer>,
    root
    );
  })
}
