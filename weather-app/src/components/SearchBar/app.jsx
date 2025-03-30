import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./app.css";

const app = ({ city, setCity, getWeather }) => {
  return (
    <div className="search-container">
      <TextField
        id="outlined-basic"
        label="Digite a cidade"
        size="small"
        value={city}
        onChange={(x) => setCity(x.target.value)}
        className="input-city"
      />
      <Button variant="contained" onClick={getWeather} size="medium">
        Pesquisar
      </Button>
    </div>
  );
};

export default app;
