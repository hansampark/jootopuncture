import React, { useState } from 'react';

const PatientContext = React.createContext([{}, () => {}]);

const PatientProvider = props => {
  const [state, setState] = useState({
    indexes: [],
    table: {}
  });
  return (
    <PatientContext.Provider value={[state, setState]}>
      {props.children}
    </PatientContext.Provider>
  );
};

const AppointmentContext = React.createContext({ indexes: [], table: {} });

const AppointmentProvider = props => {
  const [state, setState] = useState({ indexes: [], table: {} });

  return (
    <AppointmentContext.Provider value={[state, setState]}>
      {props.children}
    </AppointmentContext.Provider>
  );
};

const ChartContext = React.createContext({ indexes: {}, table: {} });

const ChartProvider = props => {
  const [state, setState] = useState({});

  return (
    <ChartContext.Provider value={[state, setState]}>
      {props.children}
    </ChartContext.Provider>
  );
};

export {
  PatientContext,
  PatientProvider,
  AppointmentContext,
  AppointmentProvider,
  ChartContext,
  ChartProvider
};
