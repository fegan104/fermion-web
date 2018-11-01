import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import reducers from './reducers'
import Home from './components/home/Home'
import Calendar from './components/calendar/Calendar'

const store = createStore(reducers)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
