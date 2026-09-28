import axios from "axios";
const BASE_URL = `https://geocoding-api.open-meteo.com/v1/search`;

const getCountriesData = (query, signal) => {
  return axios
    .get(`${BASE_URL}`, { signal, params: { name: query, count: 4 } })
    .then((response) => response.data);
};

export default getCountriesData;
