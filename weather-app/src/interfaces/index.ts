export interface WeatherData {
  name: string;
  sys: { country: string };
  weather: { main: string; description: string }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    feels_like: number;
  };
  wind: { speed: number };
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}
