import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';
import BaseLayout from './Components/Layout/BaseLayout';
import routes from './routes';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <BaseLayout>
            <Switch>
              {routes.map((route, i) => (
                <Route {...route} key={i} />
              ))}
            </Switch>
          </BaseLayout>
        </Router>
      </Provider>
    );
  }
}

export default App;
