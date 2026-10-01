const LoadingDots = ({ label = "Loading weather" }) => (
  <span className="loading-dots" role="status" aria-label={label}>
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </span>
);

export default LoadingDots;
