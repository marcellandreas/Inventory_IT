const CustomInput = ({
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
  <div className={`gap-2 flex flex-col w-60 ${className || ""}`}>
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

const CustomInput2 = ({
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
  <div className={`gap-2 flex flex-col  ${className || ""}`}>
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

const CustomSelect = ({
  label,
  options,
  name,
  value,
  onChange,
  disabled,
  className,
}) => (
  <div className={`gap-2 flex flex-col w-60 ${className || ""}`}>
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

const CustomSelect2 = ({
  label,
  options,
  name,
  value,
  onChange,
  disabled,
  className,
}) => (
  <div className={`gap-2 flex flex-col w-full  ${className || ""}`}>
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

const CustomTextArea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  className, // Tambahkan className sebagai prop
}) => (
  <div className={`gap-2 flex flex-col w-60 ${className || ""}`}>
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

export {
  CustomInput,
  CustomInput2,
  CustomSelect,
  CustomSelect2,
  CustomTextArea,
};
