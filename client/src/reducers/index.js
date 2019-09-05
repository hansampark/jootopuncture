// Root reducer

// import { combineReducers } from 'redux';
import { LOGGED_OUT, PURGE_STORAGE } from '../constants/action-types';
import session from './session';

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

    case PURGE_STORAGE:
      return {
        ...initialState,
        session: session(undefined, action)
      };

    default:
      nextState = {
        ...state,
        session: session(state.session, action)
      };
      return nextState;
  }
};

export default rootReducer;
