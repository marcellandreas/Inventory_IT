export const CustomTextArea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
}) => (
  <div className="gap-2 flex flex-col w-60">
    <label>{label}</label>
    <textarea
      className="bg-slate-200 h-[32px]"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);
