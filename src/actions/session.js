import api from '../lib/api';
import { LOGGED_IN, LOGGED_OUT } from '../constants/action-types';

// Action Creators

const userHasLoggedIn = ({ user }) => ({
  type: LOGGED_IN,
  user
});

export const userHasLoggedOut = () => ({
  type: LOGGED_OUT
});

// Action Thunks

export const login = ({ email, password }) => async dispatch => {
  console.log('[action email]', email, password);
  const data = await api.login({ email, password });
  console.log('[action data]', data);
  //   console.log('[action session]', session);

  dispatch(userHasLoggedIn({ user: data.user }));

  return data;
};

export const logout = () => async dispatch => {
  try {
    const data = await api.logout();

    dispatch(userHasLoggedOut());

    return data;
  } catch (err) {
    return;
  }
};
