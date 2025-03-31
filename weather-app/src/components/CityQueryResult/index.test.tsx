import { render, screen, fireEvent } from "@testing-library/react";
import CityQueryResult from "./index";
import { WeatherData } from "../../interfaces";
import "@testing-library/jest-dom";

jest.mock("phosphor-react", () => ({
  __esModule: true,
  MapPin: () => <svg data-testid="icon-mappin" />,
  DropHalfBottom: () => <svg data-testid="icon-humidity" />,
  Wind: () => <svg data-testid="icon-wind" />,
  Star: (props: any) => <svg data-testid="icon-star" {...props} />,
  ArrowDown: () => <svg data-testid="icon-down" />,
  ArrowUp: () => <svg data-testid="icon-up" />,
}));

jest.mock("../../utils/icons", () => ({
  __esModule: true,
  default: () => <span data-testid="weather-icon" />,
}));

const mockWeather: WeatherData = {  
  name: "Joinville",
  sys: { country: "BR" },
  weather: [{ main: "Rain", description: "chuva leve" }],
  main: {
    temp: 22,
    temp_min: 19,
    temp_max: 25,
    humidity: 90,
    feels_like: 23,
  },
  wind: { speed: 3 },
};

describe("CityQueryResult -> Component", () => {
  it("Deve exibir os dados da cidade e permitir adicionar e retirar das cidades favoritas", () => {
    const mockAddFavorite = jest.fn();

    render(
      <CityQueryResult
        weather={mockWeather}
        addFavorite={mockAddFavorite}
        isFavorite={false}
      />
    );

    expect(screen.getByText(/Joinville/)).toBeInTheDocument();
    expect(screen.getByText(/chuva leve/)).toBeInTheDocument();
    expect(screen.getByText(/Sensação térmica/)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("icon-star"));
    expect(mockAddFavorite).toHaveBeenCalledWith(mockWeather);
  });
});
