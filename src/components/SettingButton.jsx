import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

const SettingButton = () => {
  return (
    <div className="setting-btn-wrapper relative">
      <button className="text-white flex gap-2.5 bg-neutral-700 py-3 px-4.5 rounded-md cursor-pointer setting-btn">
        <img src={unitsIcon} alt="" />
        Units
        <img src={dropdownIcon} alt="" />
      </button>
      <ul className="dropdownList absolute "></ul>
    </div>
  );
};

export default SettingButton;
