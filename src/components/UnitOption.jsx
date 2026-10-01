const UnitOption = ({ children, name, value, checked, onChange }) => {
  return (
    <label className="text-[#ffffffcf] p-2.5 text-[1.2rem] focus:border-3 focus:border-neutral-900 focus:outline-white focus:outline rounded-[10px] flex items-center justify-between w-full text-start hover:bg-neutral-700 cursor-pointer unit-option mb-2">
      {children}
      <input
        type="radio"
        value={value}
        checked={checked}
        name={name}
        className="appearance-none"
        onChange={onChange}
      />
    </label>
  );
};

export default UnitOption;
