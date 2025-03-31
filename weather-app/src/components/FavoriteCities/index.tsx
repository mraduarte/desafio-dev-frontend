import "./styles.css";
import Icons from "../../utils/icons";
import { TrashSimple } from "phosphor-react";
import React from 'react';
import { WeatherData } from "../../interfaces";

interface Props {
  cities: WeatherData[];
  removeFavorite: (city: WeatherData) => void;
}

const FavoriteCities = ({ cities, removeFavorite }: Props) => {
  return (
    <div className="favorite-cities-container">
      <div>
        <h5>Cidades favoritas:</h5>
      </div>
      {cities.length > 0 ? (
        <ul>
          {cities.map((city, idx) => (
            <li key={idx}>
              {city.name} - {city.sys.country}{" "}
              <Icons weather={city.weather[0].main} iconSize={19} />
              {Math.floor(city.main.temp)}°C{" "}
              <TrashSimple
                size={19}
                onClick={() => removeFavorite(city)}
                style={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma cidade favorita.</p>
      )}
    </div>
  );
};

export default FavoriteCities;
