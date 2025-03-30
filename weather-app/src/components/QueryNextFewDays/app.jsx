import "./app.css";

const app = ({ nextFewDaysForecast }) => {
  return (
    <div className="next-few-days-container">
      <ul>
        {nextFewDaysForecast.map((x) => (
          <li key={x.dt}>
            {new Date(x.dt_txt).toLocaleDateString("pt-BR", {
              weekday: "short",
            })}{" "}
            ,{" "}
            {new Date(x.dt_txt).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
            })}
            h
            <img
              src={`http://openweathermap.org/img/wn/${x.weather[0].icon}.png`}
              alt={x.weather[0].description}
            />
            {Math.floor(x.main.temp)}°C {x.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default app;
