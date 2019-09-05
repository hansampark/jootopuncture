import api from '../lib/api';
import { persistor } from '../store';
import {
  LOGGED_IN,
  LOGGED_OUT,
  SESSION_EXPIRED,
  PURGE_STORAGE
} from '../constants/action-types';

// Action Creators
const userHasLoggedIn = ({ token, refreshToken, expiresAt, user }) => ({
  type: LOGGED_IN,
  token,
  refreshToken,
  expiresAt,
  user
});

export const sessionExpired = () => ({
  type: SESSION_EXPIRED
});

export const userHasLoggedOut = () => ({
  type: LOGGED_OUT
});

// Action Thunks

export const login = ({ email, password }) => async dispatch => {
  const data = await api.login({ email, password });

  dispatch(userHasLoggedIn(data));

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

export const purgeStorage = () => async dispatch => {
  localStorage.clear();

  if (persistor) {
    persistor.purge();
  }

  dispatch({
    type: PURGE_STORAGE
  });
};
