const BASE_URL = `https://api.open-meteo.com/v1/forecast`;
import axios from "axios";
const getWeatherData = (lat, lon, tempUnit, windUnit, precipitationUnit) => {
  return axios
    .get(
      `${BASE_URL}?latitude=${lat}&longitude=${lon}&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipitationUnit}&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,weather_code,relative_humidity_2m,precipitation,wind_speed_10m,apparent_temperature`,
    )
    .then((response) => response.data);
};

export default getWeatherData;
