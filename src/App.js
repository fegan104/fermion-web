import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import Home from './components/home/Home'
import Calendar from './components/calendar/Calendar'
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

class App extends Component {
  constructor(props){
    super(props)
    // Create a history of your choosing (we're using a browser history in this case)
    this.history = createBrowserHistory()

    // Build the middleware for intercepting and dispatching navigation actions
    let middleware = applyMiddleware(
      routerMiddleware(this.history),
      logger,
      promise(),
      thunk
    );

    this.store = createStore(
      connectRouter(this.history)(reducers),
      middleware)
  }
  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/calendar/:id" component={Calendar} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
