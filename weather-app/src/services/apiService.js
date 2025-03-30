import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY || "";
const baseUrl = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clima: ", error);
    throw error;
  }
};

export const getForecastByCity = async (city) => {
  try {
    const response = await axios.get(
      `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clima: ", error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clima: ", error);
    throw error;
  }
};

export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clima: ", error);
    throw error;
  }
};
