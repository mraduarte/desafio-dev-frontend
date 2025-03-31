import "./styles.css";
import Icons from "../../utils/icons";
import React from "react";
import { WeatherData } from "../../interfaces";

import {
  MapPin,
  DropHalfBottom,
  Wind,
  Star,
  ArrowDown,
  ArrowUp,
} from "phosphor-react";

interface Props {
  weather: WeatherData;
  addFavorite: (weather: WeatherData) => void;
  isFavorite: boolean;
}

const CityQueryResult = ({ weather, addFavorite, isFavorite }: Props) => {
  const toggleFavorite = () => addFavorite(weather);

  return (
    <div className="city-weather-container">
      <h4 className="city">
        <MapPin size={25} weight="bold" /> {weather.name}, {weather.sys.country}{" "}
        <Star
          size={18}
          weight={isFavorite ? "fill" : "bold"}
          color={isFavorite ? "#FFD700" : "#000"}
          onClick={toggleFavorite}
          style={{ cursor: "pointer" }}
        />
      </h4>

      <p className="date">
        {new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <h1 className="weather">
        <Icons weather={weather.weather[0].main} iconSize={42} />
        <p className="main-weather">{Math.floor(weather.main.temp)}°C</p>
      </h1>

      <p>{weather.weather[0].description}</p>

      <div className="min-max-temp">
        <p>
          <ArrowDown size={18} />
          {Math.floor(weather.main.temp_min)}°C
        </p>
        <p>
          <ArrowUp size={18} />
          {Math.floor(weather.main.temp_max)}°C
        </p>
        <p>
          <DropHalfBottom size={17} weight="fill" />
          {weather.main.humidity}%
        </p>
        <p>
          <Wind size={17} weight="fill" />
          {weather.wind.speed}m/s
        </p>
      </div>

      <p>Sensação térmica: {Math.floor(weather.main.feels_like)}°C</p>
    </div>
  );
};

export default CityQueryResult;
