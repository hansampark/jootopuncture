import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ApplicationLayout from './Components/Layout/ApplicationLayout';
import LoginPage from './Components/Auth/LoginPage';
import Signup from './Components/Auth/Signup';
import Calendar from './Components/Calendar';
import PatientListPage from './Components/Patients/PatientListPage';
import PatientChartForm from './Components/Patients/PatientChartForm';
import NewChartForm from './Components/Charts/NewChartForm';
import PatientChartPage from './Components/Patients/PatientChartPage';

import ResetPasswordForm from './Components/Auth/ResetPasswordForm';

const isLoggedIn = () => {
  const token = localStorage.token;

  if (!token) {
    return false;
  }
  return true;
};

const appRoutes = [
  { path: '/', component: Calendar, exact: true },
  { path: '/create-patient', component: PatientChartForm },

  {
    path: '/patients',
    component: PatientListPage,
    exact: true
  },
  {
    path: '/patients/:patientId/charts',
    component: NewChartForm,
    exact: true
  },
  {
    path: '/patients/:patientId/charts/:chartId',
    component: PatientChartPage
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
