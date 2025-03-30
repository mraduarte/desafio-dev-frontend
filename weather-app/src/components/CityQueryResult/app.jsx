import "./app.css";

import {
  MapPin,
  DropHalfBottom,
  Wind,
  CloudRain,
  Cloud,
  Snowflake,
  Star,
  CloudFog
} from "phosphor-react";

const app = ({ weather, addFavorite, isFavorite }) => {

  const toggleFavorite = () => {
    addFavorite(weather);
  };

  return (
    <div className="city-weather-container">
      <h4 className="city">
        <MapPin size={25} weight="fill" /> {weather.name}, {weather.sys.country}{" "}
        <Star
          size={18}
          weight={isFavorite ? "fill" : "bold"}
          color={isFavorite ? "#FFD700" : "#000"}
          onClick={toggleFavorite}
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
        {weather.weather[0].main === "Rain" ? (
          <CloudRain size={42} weight="bold" />
        ) : weather.weather[0].main === "Clouds" ? (
          <Cloud size={42} weight="bold" />
        ) : weather.weather[0].main === "Snow" ? (
          <Snowflake size={42} weight="bold" />
        ) : weather.weather[0].main === "Mist" ? (
          <CloudFog size={42} weight="fill" />
        ) : null}
        <p className="main-weather">{Math.floor(weather.main.temp)}°C</p>
      </h1>
      <p>{weather.weather[0].description}</p>
      <div className="min-max-temp">
        <p>Mín.: {Math.floor(weather.main.temp_min)}°C</p>
        <p>Máx.:{Math.floor(weather.main.temp_max)}°C</p>
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

      {/* <p>USAR PARA TROCAR A IMAGEM: {weather.weather[0].main}</p> */}
    </div>
  );
};

export default app;
