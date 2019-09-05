import {
  LOGGED_IN,
  LOGGED_OUT,
  SESSION_EXPIRED
} from '../constants/action-types';

const initialState = {
  accessToken: null,
  isExpired: false,
  user: null
};

export default function session(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        accessToken: action.token,
        user: action.user,
        isExpired: false
      };
    case SESSION_EXPIRED:
      return {
        ...state,
        isExpired: true
      };
    case LOGGED_OUT:
      return { ...initialState };
    default:
      return state;
  }
}

export const withSession = state => ({
  session: state.session
});
