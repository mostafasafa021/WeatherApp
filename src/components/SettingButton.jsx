import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import { useState } from "react";
import ChangeUnitsButton from "./ChangeUnitsButton";
import UnitOption from "./UnitOption";
import UnitOptionGroup from "./UnitOptionGroup";

const SettingButton = ({ weatherUnits, setWeatherUnits }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const changeToImprial = () => {
    setWeatherUnits({
      tempUnit: "fahrenheit",
      windUnit: "mph",
      precipitationUnit: "inch",
    });
  };

  const changeToMetric = () => {
    setWeatherUnits({
      tempUnit: "celsius",
      windUnit: "kmh",
      precipitationUnit: "mm",
    });
  };

  const handleUnitChange = (unit) => (e) => {
    setWeatherUnits({ ...weatherUnits, [unit]: e.target.value });
  };

  return (
    <div className="setting-btn-wrapper relative">
      <button
        className="text-white flex gap-2.5 bg-neutral-700 py-3 px-4.5 rounded-md setting-btn cursor-pointer focus:border-3 focus:border-neutral-900 focus:outline-white focus:outline-2"
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
      >
        <img src={unitsIcon} alt="" />
        Units
        <img src={dropdownIcon} alt="" />
      </button>
      {showDropdown && (
        <ul className="dropdownList absolute right-0 p-2  rounded-[10px] top-[120%] min-w-[270px]  bg-neutral-800 border-2 border-neutral-600 z-10">
          <ChangeUnitsButton
            changeToImprial={changeToImprial}
            changeToMetric={changeToMetric}
            weatherUnits={weatherUnits}
          ></ChangeUnitsButton>
          <UnitOptionGroup title="Temperature">
            <UnitOption
              name="temp"
              value="celsius"
              checked={weatherUnits.tempUnit === "celsius"}
              onChange={handleUnitChange("tempUnit")}
            >
              Celsius (℃)
            </UnitOption>
            <UnitOption
              name="temp"
              value="fahrenheit"
              checked={weatherUnits.tempUnit === "fahrenheit"}
              onChange={handleUnitChange("tempUnit")}
            >
              Fahrenheit (℉)
            </UnitOption>
          </UnitOptionGroup>
          <UnitOptionGroup title="Wind speed">
            <UnitOption
              name="wind"
              value="kmh"
              checked={weatherUnits.windUnit === "kmh"}
              onChange={handleUnitChange("windUnit")}
            >
              km/h
            </UnitOption>
            <UnitOption
              name="wind"
              value="mph"
              checked={weatherUnits.windUnit === "mph"}
              onChange={handleUnitChange("windUnit")}
            >
              mph
            </UnitOption>
          </UnitOptionGroup>
          <UnitOptionGroup title="Precipitation">
            <UnitOption
              name="precipitation"
              value="mm"
              checked={weatherUnits.precipitationUnit === "mm"}
              onChange={handleUnitChange("precipitationUnit")}
            >
              Millimeters (mm)
            </UnitOption>
            <UnitOption
              name="precipitation"
              value="inch"
              checked={weatherUnits.precipitationUnit === "inch"}
              onChange={handleUnitChange("precipitationUnit")}
            >
              Inches (in)
            </UnitOption>
          </UnitOptionGroup>
        </ul>
      )}
    </div>
  );
};

export default SettingButton;
