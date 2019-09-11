import React, { useState, useEffect } from 'react';

const PatientContext = React.createContext([{}, () => {}]);

const PatientProvider = props => {
  const [state, setState] = useState({ indexes: [], table: {} });
  return (
    <PatientContext.Provider value={[state, setState]}>
      {props.children}
    </PatientContext.Provider>
  );
};

const AppointmentContext = React.createContext({ indexes: [], table: {} });

const AppointmentProvider = props => {
  const [state, setState] = useState({ indexes: [], table: {} });
  useEffect(() => {
    console.log('[state]', state);
  });
  return (
    <AppointmentContext.Provider value={[state, setState]}>
      {props.children}
    </AppointmentContext.Provider>
  );
};

export {
  PatientContext,
  PatientProvider,
  AppointmentContext,
  AppointmentProvider
};
