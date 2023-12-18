import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en  authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = authReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('debe de (login) llamar al login autenticar y establecer un usuario', () => {
    const user = {
      name: 'Carlos Coronado',
      id: '1233',
    };

    const action = { type: types.login, payload: user };

    const newState = authReducer({ logged: false }, action);

    expect(newState).toEqual({
      logged: true,
      user: user,
    });
  });

  test('debe de (logout) borrar name del usuario y logged en false', () => {
    const initialState = {};

    const user = {
      username: 'Carlos Coronado',
    };

    const action = { type: types.logout, user: user };

    const newState = authReducer(initialState, action);

    expect(newState).toEqual({
      logged: false,
    });
  });
});
