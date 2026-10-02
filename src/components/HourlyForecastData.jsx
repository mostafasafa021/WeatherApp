import dropdownIcon from "../assets/images/icon-dropdown.svg";

const HourlyForecastData = ({
  days,
  currentDate,
  hours,
  temperatureUnit,
  onDayChange,
}) => (
  <section className="hourly-forecast" aria-labelledby="hourly-heading">
    <div className="hourly-forecast-header">
      <h2 id="hourly-heading">Hourly forecast</h2>
      <details className="hourly-forecast-day-menu">
        <summary className="hourly-forecast-day">
          {currentDate}
          <img src={dropdownIcon} alt="" />
        </summary>
        <ul className="hourly-forecast-day-options">
          {days.map((day) => (
            <li
              className="hourly-forecast-day-option"
              key={day.dayName}
              onClick={() => {
                onDayChange(day.dayName);
                document.querySelector(".hourly-forecast-day").click();
              }}
            >
              {day.dayName}
            </li>
          ))}
        </ul>
      </details>
    </div>
    <div className="hourly-forecast-list">
      {hours.map(({ time, timeLabel, condition, temperature }) => (
        <article className="hourly-forecast-hour" key={time}>
          <div className="hourly-forecast-time">
            <img src={condition.icon} alt={condition.label} />
            <h3>{timeLabel}</h3>
          </div>
          <p>
            {temperature}
            {temperatureUnit}
          </p>
        </article>
      ))}
    </div>
  </section>
);

export default HourlyForecastData;
