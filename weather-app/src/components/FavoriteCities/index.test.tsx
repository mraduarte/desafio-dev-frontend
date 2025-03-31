import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteCities from "./index";
import { WeatherData } from "../../interfaces";
import "@testing-library/jest-dom";

jest.mock("phosphor-react", () => ({
  __esModule: true,
  TrashSimple: (props: any) => <svg data-testid="trash-icon" {...props} />,
}));

jest.mock('../../utils/icons', () => ({
    __esModule: true,
    default: () => <span data-testid="weather-icon" />,
  }));

const mockCities: WeatherData[] = [
  {
    name: "Joinville",
    sys: { country: "BR" },
    weather: [{ main: "Clouds", description: "" }],
    main: {
      temp: 25,
      temp_min: 23,
      temp_max: 30,
      humidity: 100,
      feels_like: 27,
    },
    wind: { speed: 2 },
  },
];

describe("FavoriteCities -> Component", () => {
  it("Deve realizar a exibição da cidade favorita e permitir excluí-la da lista pelo botão de lixeira", () => {
    const mockRemoveFavorite = jest.fn();

    render(
      <FavoriteCities cities={mockCities} removeFavorite={mockRemoveFavorite} />
    );

    expect(screen.getByText(/Joinville/)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("trash-icon"));
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockCities[0]);
  });

  it("Deve mostrar mensagem de erro se não tiver cidade favorita", () => {
    render(<FavoriteCities cities={[]} removeFavorite={jest.fn()} />);
    expect(screen.getByText(/Nenhuma cidade favorita/)).toBeInTheDocument();
  });
});
