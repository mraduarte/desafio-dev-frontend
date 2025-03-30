import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar/app";
import CityQueryResult from "./components/CityQueryResult/app";
import QueryNextFewDays from "./components/QueryNextFewDays/app";
import FavoriteCities from "./components/FavoriteCities/app"

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [nextForecast, setNextForecast] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY || "";

  const getWeather = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      const nextForecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      console.log(weatherResponse.data);

      setWeather(weatherResponse.data);
      setNextForecast(nextForecastResponse.data.list.slice(0, 5));
    } catch (error) {
      console.log("Erro ao captar o clima: " + error);
    }
  };
  const toggleFavorite = (weather) => {
    if (!weather) return;
  
    const isAlreadyFavorite = favorite.some((item) => item.name === weather.name);
  
    if (isAlreadyFavorite) {
      setFavorite(favorite.filter((item) => item.name !== weather.name));
    } else {
      setFavorite([...favorite, weather]);
    }
  };
  return (
    <div
      className={`weather-container ${weather ? weather.weather[0].main : ""}`}
    >
      <h1>Previsão do tempo</h1>
      <SearchBar city={city} setCity={setCity} getWeather={getWeather} />
      <div className="forecast-containers">
        <FavoriteCities cities={favorite}/>
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
