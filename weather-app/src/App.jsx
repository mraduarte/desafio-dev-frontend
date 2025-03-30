import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar/app";
import CityQueryResult from "./components/CityQueryResult/app";
import QueryNextFewDays from "./components/QueryNextFewDays/app";
import FavoriteCities from "./components/FavoriteCities/app";
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords
} from "./services/apiService";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [nextForecast, setNextForecast] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY || "";

  const getWeather = async () => {
    if (!city) {
      alert("Cidade não informada.");
      return;
    }

    try {
      const weatherResponse = await getWeatherByCity(city);
      const nextForecastResponse = await getForecastByCity(city);

      setWeather(weatherResponse);
      setNextForecast(nextForecastResponse.list.slice(0, 5));
    } catch (error) {
      console.log("Erro ao captar o clima: " + error);
      alert("Previsão não encontrada para a cidade informada.");
    }
  };

  const toggleFavorite = (weather) => {
    if (!weather) return;

    const isAlreadyFavorite = favorite.some(
      (item) => item.name === weather.name
    );

    const updatedFavorites = isAlreadyFavorite
      ? favorite.filter((item) => item.name !== weather.name)
      : [...favorite, weather];

    setFavorite(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const weatherResponse = await getWeatherByCoords(lat, lon);
      const nextForecastResponse = await getForecastByCoords(lat, lon);

      setCity(weatherResponse.name);
      setWeather(weatherResponse);
      setNextForecast(nextForecastResponse.list.slice(0, 5));
    });
  }, [apiKey]);

  useEffect(() => {
    const favorites = localStorage.getItem("favorite-city");
    if (favorites) {
      setFavorite(JSON.parse(favorites));
    }
  }, []);

  useEffect(() => {
    if (favorite.length > 0) {
      localStorage.setItem("favorite-city", JSON.stringify(favorite));
    } else {
      localStorage.removeItem("favorite-city");
    }
  }, [favorite]);

  return (
    <div
      className={`weather-container ${weather ? weather.weather[0].main : ""}`}
    >
      <h1 style={{ fontWeight: "bold" }}>Previsão do tempo</h1>
      <SearchBar city={city} setCity={setCity} getWeather={getWeather} />
      <div className="forecast-containers">
        <FavoriteCities cities={favorite} removeFavorite={toggleFavorite} />
        {weather && (
          <CityQueryResult
            weather={weather}
            addFavorite={toggleFavorite}
            isFavorite={favorite.some((item) => item.name === weather.name)}
          />
        )}
        {nextForecast.length > 0 && (
          <QueryNextFewDays nextFewDaysForecast={nextForecast} />
        )}
      </div>
    </div>
  );
}

export default App;
