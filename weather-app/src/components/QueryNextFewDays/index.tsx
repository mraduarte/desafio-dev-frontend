import "./styles.css";
import React from 'react';
import { ForecastItem } from "../../interfaces";

interface Props {
  nextFewDaysForecast: ForecastItem[];
}

const App = ({ nextFewDaysForecast }: Props) => (
  <div className="next-few-days-container">
    <h5>Próximas previsões:</h5>
    <ul>
      {nextFewDaysForecast.map((item) => (
        <li key={item.dt}>
          {new Date(item.dt_txt).toLocaleDateString("pt-BR", { weekday: "short" })},{" "}
          {new Date(item.dt_txt).toLocaleTimeString("pt-BR", { hour: "2-digit" })}h
          <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt={item.weather[0].description}
          />
          {Math.floor(item.main.temp)}°C {item.weather[0].description}
        </li>
      ))}
    </ul>
  </div>
);

export default App;
