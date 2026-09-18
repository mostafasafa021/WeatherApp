import logo from "../assets/images/logo.svg";
import SettingButton from "./SettingButton";

const Header = () => {
  return (
    <header className=" flex justify-between items-center">
      <img src={logo} alt="" />
      <SettingButton />
    </header>
  );
};

export default Header;
