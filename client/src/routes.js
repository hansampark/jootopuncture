import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ApplicationLayout from './Components/Layout/ApplicationLayout';
import LoginPage from './Components/Auth/LoginPage';
import Signup from './Components/Auth/Signup';
import Calendar from './Components/Calendar';
import PatientListPage from './Components/Patients/PatientListPage';
import PatientPage from './Components/Patients/PatientPage';
import ResetPasswordForm from './Components/Auth/ResetPasswordForm';

const isLoggedIn = () => {
  const token = localStorage.id_token;

  if (!token) {
    return false;
  }
  return true;
};

const appRoutes = [
  { path: '/', component: Calendar, exact: true },
  {
    path: '/patients',
    component: PatientPage
  },
  {
    path: '/patientList',
    component: PatientListPage
  }
];

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/signup', component: Signup },
  { path: '/reset', component: ResetPasswordForm },
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
