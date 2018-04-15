import React, { Component } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
  // push
} from 'react-router-redux';

import reducers from './reducers'; // Or wherever you keep your reducers

import { Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Protected from './Protected';

const config = {
  issuer: 'https://dev-665774.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaed6dpppzPxFKTp0h7'
};

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Security
            issuer={config.issuer}
            client_id={config.client_id}
            redirect_uri={config.redirect_uri}
          >
            <Route path="/" exact={true} component={Home} />
            <Route path="/implicit/callback" component={ImplicitCallback} />

            <SecureRoute path="/protected" component={Protected} />
          </Security>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
