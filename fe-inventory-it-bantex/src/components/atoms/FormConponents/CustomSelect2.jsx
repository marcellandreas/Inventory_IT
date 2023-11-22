export const CustomSelect2 = ({
  label,
  options,
  name,
  value,
  onChange,
  disabled,
  className,
}) => (
  <div className={`gap-2 flex flex-col  ${className || ""}`}>
    <label>{label}</label>
    <div className="flex justify-end items-end gap-2">
      <select
        className="w-full bg-gray-200 rounded-md shadow-sm h-8"
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
      >
        {options}
      </select>
    </div>
  </div>
);
