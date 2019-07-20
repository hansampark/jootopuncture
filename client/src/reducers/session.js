import { LOGGED_IN, LOGGED_OUT } from '../constants/action-types';

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
        ...action.session,
        user: action.user,
        isExpired: false
      };
    case LOGGED_OUT:
      return { ...initialState };
    default:
      return state;
  }
}

export const withSession = state => ({
  sesison: state.session
});
