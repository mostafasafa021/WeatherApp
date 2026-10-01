import logo from "../assets/images/logo.svg";
import SettingButton from "./SettingButton";

const Header = ({weatherUnits,setWeatherUnits}) => {
  return (
    <header className=" flex justify-between items-center">
      <img src={logo} alt="" />
      <SettingButton weatherUnits={weatherUnits} setWeatherUnits={setWeatherUnits}/>
    </header>
  );
};

export default Header;
