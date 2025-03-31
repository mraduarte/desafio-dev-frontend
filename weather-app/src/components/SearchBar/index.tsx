import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./styles.css";

interface Props {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  getWeather: () => void;
}

const SearchBar = ({ city, setCity, getWeather }: Props) => (
  <div className="search-container">
    <TextField
      id="outlined-basic"
      label="Digite a cidade"
      size="small"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="search-input"
    />
    <Button
      variant="contained"
      onClick={getWeather}
      size="large"
      className="search-button"
    >
      Pesquisar
    </Button>
  </div>
);

export default SearchBar;
