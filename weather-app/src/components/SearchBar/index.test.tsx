import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index';

jest.mock('@mui/material/TextField', () => (props: any) => (
  <input aria-label="Digite a cidade" {...props} />
));
jest.mock('@mui/material/Button', () => (props: any) => (
  <button {...props}>{props.children}</button>
));

describe('SearchBar -> Component', () => {
  it('Deve renderizar o Input e o Button', () => {
    const mockSetCity = jest.fn();
    const mockGetWeather = jest.fn();

    render(
      <SearchBar city="" setCity={mockSetCity} getWeather={mockGetWeather} />
    );

    const input = screen.getByLabelText(/Digite a cidade/i);
    const button = screen.getByRole('button', { name: /Pesquisar/i });

    fireEvent.change(input, { target: { value: 'Joinville' } });
    expect(mockSetCity).toHaveBeenCalledWith('Joinville');

    fireEvent.click(button);
    expect(mockGetWeather).toHaveBeenCalled();
  });
});
