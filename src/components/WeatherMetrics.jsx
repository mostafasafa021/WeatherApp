const metricLabels = ["Feels Like", "Humidity", "Wind", "Precipitation"];

const WeatherMetrics = ({ metrics = [], isLoading = false }) => (
  <div className="weather-metrics" aria-label="Current conditions">
    {isLoading
      ? metricLabels.map((label) => (
          <article className="weather-metric" key={label}>
            <h3>{label}</h3>
            <span
              className="weather-placeholder weather-placeholder-metric"
              aria-hidden="true"
            />
          </article>
        ))
      : metrics.map(({ label, value, unit }) => (
          <article className="weather-metric" key={label}>
            <h3>{label}</h3>
            <p>
              {value}
              <span>{unit}</span>
            </p>
          </article>
        ))}
  </div>
);

export default WeatherMetrics;
