export const CustomInput = ({
  label,
  placeholder,
  name,
  type,
  value,
  onChange,
}) => (
  <div className="gap-2 flex flex-col w-60">
    <label>{label}</label>
    <input
      className="bg-slate-200"
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);
