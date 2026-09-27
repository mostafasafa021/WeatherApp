import errorIcon from "../assets/images/icon-error.svg";
import retryIcon from "../assets/images/icon-retry.svg";

const ErrorWidget = ({ setRetryCount, setIsError }) => {
  return (
    <section className="flex flex-col items-center text-center text-white mt-24 md:mt-32">
      <img src={errorIcon} alt="" className="w-18 h-18 mb-6" />
      <h2 className="font-bricolage-grotesque text-3xl font-semibold mb-3">
        Something went wrong
      </h2>
      <p className="text-neutral-300 text-lg max-w-md mb-7">
        We couldn&apos;t connect to the server. Please try again later.
      </p>
      <button
        type="button"
        className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 rounded-md px-4 py-3 text-white cursor-pointer transition-colors"
        onClick={() => {
          setIsError(false);
          setRetryCount((count) => count + 1);
        }}
      >
        <img src={retryIcon} alt="" />
        Retry
      </button>
    </section>
  );
};

export default ErrorWidget;
