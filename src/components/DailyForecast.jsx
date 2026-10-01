const cards = Array.from({ length: 7 }, (_, index) => index);



const DailyForecast = () => (
  <section
    className="daily-forecast"
    aria-labelledby="daily-heading"
    aria-busy="true"
  >
    <h2 id="daily-heading">Daily forecast</h2>
    <div className="daily-forecast-grid">
      {cards.map((card) => (
        <article
          className="daily-forecast-day daily-forecast-day-loading"
          key={card}
        >
          <span
            className="forecast-skeleton forecast-skeleton-label"
            aria-hidden="true"
          />
          <span
            className="forecast-skeleton forecast-skeleton-weather"
            aria-hidden="true"
          />
          <span className="daily-forecast-temperatures" aria-hidden="true">
            <span className="forecast-skeleton forecast-skeleton-temperature" />
            <span className="forecast-skeleton forecast-skeleton-temperature" />
          </span>
        </article>
      ))}
    </div>
  </section>
);

export default DailyForecast;
