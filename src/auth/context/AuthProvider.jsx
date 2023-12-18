import { useReducer } from 'react';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { types } from '../types/types';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = '') => {
    const user = { id: 'ABC', name };
    const action = {
      type: types.login,
      payload: {
        id: 'ABC',
        name: name,
      },
    };

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');

    const action = {
      type: types.logout,
    };

    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ ...state, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};
