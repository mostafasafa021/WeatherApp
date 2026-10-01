const UnitOptionGroup = ({ title, children }) => {
  return (
    <div>
      <span className="text-[#ffffffab] p-2.5">{title}</span>
      {children}
    </div>
  );
};

export default UnitOptionGroup;
