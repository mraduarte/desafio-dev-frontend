import "./app.css";

import { CloudRain, Cloud, Snowflake } from "phosphor-react";

const app = ({ cities }) => {
  return (
    <div>
      <ul>
        {cities.map((city, idx) => (
          <li key={idx}>
            {city.name} - {city.sys.country} -{" "}
            {city.weather[0].main === "Rain" ? (
              <CloudRain size={19} weight="bold" />
            ) : city.weather[0].main === "Clouds" ? (
              <Cloud size={19} weight="bold" />
            ) : city.weather[0].main === "Snow" ? (
              <Snowflake size={19} weight="bold" />
            ) : null}{" "}
            {Math.floor(city.main.temp)}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default app;
