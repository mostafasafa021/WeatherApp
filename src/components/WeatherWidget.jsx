import { useEffect, useState } from "react";
import getWeatherData from "../services/weatherApi";
import WeatherLoadingState from "./WeatherLoadingState";
import WeatherDataState from "./WeatherDataState";
import axios from "axios";
const WeatherWidget = ({
  selectedPlace,
  weatherUnits,
  retryCount,
  setIsError,
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { tempUnit, windUnit, precipitationUnit } = weatherUnits;
  const {
    latitude = 33.8933,
    longitude = 35.5016,
    timezone = "Europe/Berlin",
  } = selectedPlace ?? {};

  useEffect(() => {
    if (!selectedPlace) return;
    const controller = new AbortController();
    setIsLoading(true);
    getWeatherData(
      latitude,
      longitude,
      tempUnit,
      windUnit,
      precipitationUnit,
      timezone,
      controller.signal,
    )
      .then((data) => {
        if (controller.signal.aborted) return;
        setIsError(false);
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(axios.isCancel(error));
        if (controller.signal.aborted) return;
        setIsError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [selectedPlace, weatherUnits, retryCount]);

  if (!selectedPlace) {
    return (
      <div className="text-neutral-0 mt-28 text-[1.5rem] font-medium text-center tracking-wide z-10">
        No Search Results Found!
      </div>
    );
  }

  if (isLoading) {
    return <WeatherLoadingState />;
  }

  return (
    <>
      {weatherData && (
        <WeatherDataState
          weatherData={weatherData}
          selectedPlace={selectedPlace}
          weatherUnits={weatherUnits}
        />
      )}
    </>
  );
};

export default WeatherWidget;
