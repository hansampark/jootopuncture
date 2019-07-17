import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ApplicationLayout from './Components/Layout/ApplicationLayout';
import LoginPage from './Components/Auth/LoginPage';
import Signup from './Components/Auth/Signup';
import EmptyPage from './Components/EmptyPage';
import PatientPage from './Components/Patients/PatientPage';

const isLoggedIn = () => {
  const token = localStorage.id_token;

  if (!token) {
    return false;
  }
  return true;
};

const appRoutes = [
  { path: '/', component: EmptyPage, exact: true },
  {
    path: '/patients',
    component: PatientPage
  }
];

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/signup', component: Signup },
  {
    path: '/',
    render: props => {
      if (isLoggedIn()) {
        return (
          <ApplicationLayout {...props}>
            <Switch>
              {appRoutes.map((route, i) => (
                <Route {...route} key={i} />
              ))}
            </Switch>
          </ApplicationLayout>
        );
      }

      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      );
    }
  }
];

export default routes;
