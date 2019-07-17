import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import routes from './routes';

import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {routes.map((route, i) => (
              <Route {...route} key={i} />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

// export default withAuth(App);
