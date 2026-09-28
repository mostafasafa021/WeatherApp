import { useEffect } from "react";
import getWeatherData from "../services/weatherApi";

const WeatherWidget = ({
  selectedPlace,
  weatherUnits,
  isError,
  setIsError,
}) => {
  const { tempUnit, windUnit, precipitationUnit } = weatherUnits;
  const {
    latitude = 33.8933,
    longitude = 35.5016,
    timezone = "Europe/Berlin",
  } = selectedPlace ?? {};

  useEffect(() => {
    if (!selectedPlace) return;
    getWeatherData(
      latitude,
      longitude,
      tempUnit,
      windUnit,
      precipitationUnit,
      timezone,
    )
      .then((data) => {
        setIsError(false);
        console.log("Weather Data:", data);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [selectedPlace, weatherUnits]);

  if (!selectedPlace) return <div>No Selected Place Yet</div>;
};

export default WeatherWidget;
