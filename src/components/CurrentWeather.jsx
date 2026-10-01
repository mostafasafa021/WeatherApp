import LoadingDots from "./LoadingDots";

const CurrentWeather = ({
  isLoading = false,
  location,
  date,
  condition,
  temperature,
  temperatureUnit,
}) => (
  <article className="current-weather">
    {isLoading ? (
      <>
        <div className="current-weather-location" aria-hidden="true">
          <span className="weather-placeholder weather-placeholder-location" />
          <span className="weather-placeholder weather-placeholder-date" />
        </div>
        <div className="current-weather-conditions">
          <LoadingDots />
        </div>
      </>
    ) : (
      <>
        <div className="current-weather-location current-weather-location-loaded">
          <h2>{location}</h2>
          <p>{date}</p>
        </div>
        <div className="current-weather-conditions current-weather-conditions-loaded">
          <img src={condition.icon} alt={condition.label} />
          <p>
            {temperature}
            {temperatureUnit}
          </p>
        </div>
      </>
    )}
  </article>
);

export default CurrentWeather;
