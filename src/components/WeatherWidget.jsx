import { useEffect } from "react";
import getWeatherData from "../services/weatherApi";

const WeatherWidget = ({ selectedPlace, weatherUnits }) => {
  if (!selectedPlace) return <div>No Selected Place Yet</div>
  const { tempUnit, windUnit, precipitationUnit } = weatherUnits;
  const { latitude = 33.8933, longitude = 35.5016 } = selectedPlace ?? {};
  useEffect(() => {
    getWeatherData(
      latitude,
      longitude,
      tempUnit,
      windUnit,
      precipitationUnit,
    ).then((data) => console.log(data));
  }, [selectedPlace,weatherUnits]);
};

export default WeatherWidget;
