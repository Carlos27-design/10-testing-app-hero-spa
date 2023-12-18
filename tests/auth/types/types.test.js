import { types } from '../../../src/auth/types/types';

describe('Prueba sobre los types', () => {
  test('debe de regresar estos types', () => {
    expect(types).toEqual({
      login: 'Login',
      logout: 'Logout',
    });
  });
});
