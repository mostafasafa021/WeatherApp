import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import CurrentWeather from "./CurrentWeather";
import WeatherMetrics from "./WeatherMetrics";
import "./WeatherWidget.css";

const WeatherLoadingState = () => (
  <section
    className="weather-dashboard"
    aria-label="Weather forecast"
    aria-busy="true"
  >
    <div className="weather-primary">
      <CurrentWeather isLoading />
      <WeatherMetrics isLoading />

      <DailyForecast />
    </div>

    <HourlyForecast />
  </section>
);

export default WeatherLoadingState;
