const ChangeUnitsButton = ({
  weatherUnits,
  changeToImprial,
  changeToMetric,
}) => {
  const {
    tempUnit: temp,
    windUnit: wind,
    precipitationUnit: precipitation,
  } = weatherUnits;
  const isMetric =
    temp === "celsius" || wind === "kmh" || precipitation === "mm";

  return (
    <button
      onClick={isMetric ? changeToImprial : changeToMetric}
      className="text-[#ffffffcf] p-2.5 text-[1.2rem] focus:border-3 focus:border-neutral-900 focus:outline-white focus:outline rounded-[10px] block w-full text-start hover:bg-neutral-700 cursor-pointer"
    >
      {isMetric ? "Switch to Imperial" : "Switch to Metric"}
    </button>
  );
};

export default ChangeUnitsButton;
