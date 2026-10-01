import dropdownIcon from "../assets/images/icon-dropdown.svg";

const rows = Array.from({ length: 6 }, (_, index) => index);

const HourlyForecast = () => (
  <section
    className="hourly-forecast"
    aria-labelledby="hourly-heading"
    aria-busy="true"
  >
    <div className="hourly-forecast-header">
      <h2 id="hourly-heading">Hourly forecast</h2>
      <span className="hourly-forecast-day" aria-hidden="true">
        <span className="forecast-skeleton forecast-skeleton-day" />
        <img src={dropdownIcon} alt="" />
      </span>
    </div>
    <div className="hourly-forecast-list">
      {rows.map((row) => (
        <article
          className="hourly-forecast-hour hourly-forecast-hour-loading"
          key={row}
        >
          <span className="hourly-forecast-time-skeleton" aria-hidden="true">
            <span className="forecast-skeleton forecast-skeleton-weather" />
            <span className="forecast-skeleton forecast-skeleton-time" />
          </span>
          <span
            className="forecast-skeleton forecast-skeleton-hour"
            aria-hidden="true"
          />
        </article>
      ))}
    </div>
  </section>
);

export default HourlyForecast;
