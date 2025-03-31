import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import { WeatherData, ForecastItem } from "./interfaces";
import SearchBar from "./components/SearchBar/index";
import CityQueryResult from "./components/CityQueryResult/index";
import QueryNextFewDays from "./components/QueryNextFewDays/index";
import FavoriteCities from "./components/FavoriteCities/index";

import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from "./services/apiService";

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [nextForecast, setNextForecast] = useState<ForecastItem[]>([]);
  const [favorite, setFavorite] = useState<WeatherData[]>([]);

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
      console.error("Erro ao captar o clima:", error);
      alert("Previsão não encontrada para a cidade " + city);
    }
  };

  const toggleFavorite = (weather: WeatherData) => {
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
      const { latitude: lat, longitude: lon } = position.coords;

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

  useEffect(() => {
    const addDefaultFavorite = async () => {
      const defaultWeather = await getWeatherByCity("Manchester");
  
      setFavorite((x) => {
        const isAlreadyFavorite = x.some((city) => city.name === "Manchester");
        if (!isAlreadyFavorite) {
          const updated = [...x, defaultWeather];
          localStorage.setItem("favorite-city", JSON.stringify(updated));
          return updated;
        }
        return x;
      });
    };
  
    addDefaultFavorite();
  }, []);
  
  return weather ? (
    <div className={`weather-container ${weather.weather[0].main}`}>
      <h1 style={{ fontWeight: "bold" }}>Previsão do tempo</h1>

      <SearchBar city={city} setCity={setCity} getWeather={getWeather} />

      <div className="forecast-containers">
        <FavoriteCities cities={favorite} removeFavorite={toggleFavorite} />

        <CityQueryResult
          weather={weather}
          addFavorite={toggleFavorite}
          isFavorite={favorite.some((item) => item.name === weather.name)}
        />

        {nextForecast.length > 0 && (
          <QueryNextFewDays nextFewDaysForecast={nextForecast} />
        )}
      </div>
    </div>
  ) : (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

export default App;
