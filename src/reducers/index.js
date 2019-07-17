// Root reducer

import { combineReducers } from 'redux';
import { LOGGED_OUT } from '../constants/action-types';
import session from './session';

const entities = combineReducers({});

const initialState = {
  session: {}
};

const rootReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case LOGGED_OUT:
      nextState = {
        ...state,
        session: session(undefined, action)
      };

      return nextState;

    default:
      nextState = {
        ...state,
        session: session(state.session, action)
      };
      return nextState;
  }
};

export default rootReducer;
