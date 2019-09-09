import React, { useState } from 'react';

const PatientContext = React.createContext([{}, () => {}]);

const PatientProvider = props => {
  const [state, setState] = useState({});
  return (
    <PatientContext.Provider value={[state, setState]}>
      {props.children}
    </PatientContext.Provider>
  );
};

export { PatientContext, PatientProvider };
