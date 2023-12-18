import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage/>', () => {
  test('debe de mostrarse con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('debe de mostrar a batman y el input con el valor del queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

    const alert = screen.getByLabelText('alert-danger');

    expect(alert.style.display).toBe('none');
  });

  test('debe de mostrar un error si no se encuentra el heroe', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText('alert-danger');

    expect(alert.style.display).toBe('');
  });

  test('debe de llamar al el navigate a la pantalla nueva', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const buscar = screen.getByRole('textbox');
    fireEvent.change(buscar, { target: { value: 'Superman' } });

    const buscarBtn = screen.getByLabelText('search');
    fireEvent.click(buscarBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=Superman');
  });
});
