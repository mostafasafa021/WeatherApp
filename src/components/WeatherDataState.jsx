import drizzleIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import overcastIcon from "../assets/images/icon-overcast.webp";
import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import stormIcon from "../assets/images/icon-storm.webp";
import sunnyIcon from "../assets/images/icon-sunny.webp";
import { useState } from "react";
import CurrentWeather from "./CurrentWeather";
import DailyForecastData from "./DailyForecastData";
import HourlyForecastData from "./HourlyForecastData";
import WeatherMetrics from "./WeatherMetrics";

const forecastDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const handleTimeChange = (dayname) => {
  const today = new Date();

  const currentDay = today.getDay();
  const targetDay = forecastDays.indexOf(dayname);

  const diffrence = targetDay - currentDay;
  today.setDate(today.getDate() + diffrence);
  return today.toISOString().slice(0, 10);
};

const conditionIcons = [
  { codes: [0], label: "Clear sky", icon: sunnyIcon },
  { codes: [1, 2], label: "Partly cloudy", icon: partlyCloudyIcon },
  { codes: [3], label: "Overcast", icon: overcastIcon },
  { codes: [45, 48], label: "Fog", icon: fogIcon },
  { codes: [51, 53, 55, 56, 57], label: "Drizzle", icon: drizzleIcon },
  {
    codes: [61, 63, 65, 66, 67, 80, 81, 82],
    label: "Rain",
    icon: rainIcon,
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    label: "Snow",
    icon: snowIcon,
  },
  { codes: [95, 96, 99], label: "Thunderstorm", icon: stormIcon },
];

const getCondition = (code) =>
  conditionIcons.find(({ codes }) => codes.includes(code)) ?? {
    label: "Weather conditions",
    icon: overcastIcon,
  };

const formatDate = (value, options) => {
  if (!value) return "";
  const dateOnly = value.slice(0, 10);
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "UTC",
  }).format(new Date(`${dateOnly}T12:00:00Z`));
};

const formatTime = (value) => {
  const match = value.match(/T(\d{2}):(\d{2})/);

  if (!match) return value;

  const hour = Number(match[1]);
  const minute = match[2];
  const hour12 = hour % 12 || 12;
  const meridiem = hour >= 12 ? "PM" : "AM";
  return minute === "00"
    ? `${hour12} ${meridiem}`
    : `${hour12}:${minute} ${meridiem}`;
};

const WeatherDataState = ({ weatherData, selectedPlace, weatherUnits }) => {
  const { current, daily, hourly } = weatherData;
  const [selectedDate, setSelectedDate] = useState(null);
  const temperatureUnit = weatherUnits.tempUnit === "fahrenheit" ? "°F" : "°C";
  const windUnit = weatherUnits.windUnit === "mph" ? "mph" : "km/h";
  const precipitationUnit =
    weatherUnits.precipitationUnit === "inch" ? "in" : "mm";
  const currentCondition = getCondition(current.weather_code);
  const currentDate = selectedDate || current.time?.slice(0, 10);
  const location = [selectedPlace?.name, selectedPlace?.country]
    .filter(Boolean)
    .join(", ");
  const currentHours = (hourly?.time ?? [])
    .map((time, index) => ({
      time,
      temperature: hourly.temperature_2m[index],
      weatherCode: hourly.weather_code[index],
    }))
    .filter(({ time }) => time.startsWith(currentDate ?? ""))
    .slice(12, 24);
  const dailyForecast = (daily?.time ?? []).map((date, index) => ({
    date,
    day: formatDate(date, { weekday: "short" }),
    condition: getCondition(daily.weather_code[index]),
    high: Math.round(daily.temperature_2m_max[index]),
    low: Math.round(daily.temperature_2m_min[index]),
  }));
  const hourlyForecast = currentHours.map(
    ({ time, temperature, weatherCode }) => ({
      time,
      timeLabel: formatTime(time),
      condition: getCondition(weatherCode),
      temperature: Math.round(temperature),
    }),
  );
  const metrics = [
    {
      label: "Feels Like",
      value: Math.round(current.apparent_temperature),
      unit: temperatureUnit,
    },
    {
      label: "Humidity",
      value: current.relative_humidity_2m,
      unit: "%",
    },
    {
      label: "Wind",
      value: Math.round(current.wind_speed_10m),
      unit: windUnit,
    },
    {
      label: "Precipitation",
      value: Number(current.precipitation),
      unit: precipitationUnit,
    },
  ];
  const handleDayChange = (day) => {
    setSelectedDate(handleTimeChange(day));
  };

  return (
    <section className="weather-dashboard" aria-label="Weather forecast">
      <div className="weather-primary">
        <CurrentWeather
          location={location}
          date={formatDate(current.time, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          condition={currentCondition}
          temperature={Math.round(current.temperature_2m)}
          temperatureUnit={temperatureUnit}
        />

        <WeatherMetrics metrics={metrics} />

        <DailyForecastData
          days={dailyForecast}
          temperatureUnit={temperatureUnit}
        />
      </div>

      <HourlyForecastData
        days={forecastDays}
        currentDate={formatDate(currentDate, { weekday: "long" })}
        hours={hourlyForecast}
        temperatureUnit={temperatureUnit}
        onDayChange={handleDayChange}
      />
    </section>
  );
};

export default WeatherDataState;
