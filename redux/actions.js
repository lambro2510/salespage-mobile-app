export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const removeToken = () => ({
  type: 'REMOVE_TOKEN',
});

export const setLogin = () => ({
  type: 'SET_LOGIN',
});

export const setLogout = () => ({
  type: 'SET_LOGOUT',
});
