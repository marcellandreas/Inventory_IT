export const CustomInput2 = ({
  label,
  placeholder,
  name,
  type,
  value,
  defaultValue,
  onChange,
  className,
  readOnly,
}) => (
  <div className={`gap-2 flex flex-col ${className || ""}`}>
    <label>{label}</label>
    <input
      className="bg-slate-200"
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      readOnly={readOnly ? true : undefined}
    />
  </div>
);
