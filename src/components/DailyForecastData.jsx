const DailyForecastData = ({ days, temperatureUnit }) => (
  <section className="daily-forecast" aria-labelledby="daily-heading">
    <h2 id="daily-heading">Daily forecast</h2>
    <div className="daily-forecast-grid">
      {days.map(({ date, day, condition, high, low }) => (
        <article className="daily-forecast-day" key={date}>
          <h3>{day}</h3>
          <img src={condition.icon} alt={condition.label} />
          <div className="daily-forecast-temperatures">
            <span>
              {high}
              {temperatureUnit}
            </span>
            <span>
              {low}
              {temperatureUnit}
            </span>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default DailyForecastData;
