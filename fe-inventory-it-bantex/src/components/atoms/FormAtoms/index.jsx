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
  width,
}) => (
  <div
    className={`gap-2  flex flex-col w-${width ? width : "full"}  ${
      className || ""
    }`}
  >
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

// TextAreaAtom.js
const CustomTextArea2 = ({
  label,
  value,
  readOnly,
  placeholder,
  name,
  onChange,
}) => {
  return (
    <div className="gap-2 flex flex-col w-full row-span-2">
      <label>{label}</label>
      <textarea
        className="bg-gray-100 border border-gray-300 min-h-[120px]"
        readOnly={readOnly}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

const RadioButton = ({
  name,
  value,
  label,
  onChange,
  checked,
  defaultValue,
}) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        defaultValue={defaultValue}
        value={value}
        checked={checked}
        onChange={onChange || (() => {})}
        className="border-2 border-slate-800 rounded-md p-2"
      />
      <label className="ml-2">{label}</label>
    </>
  );
};

// CustomRadioGroupAtom.js
const CustomRadioGroup = ({ label, options, value, onChange }) => {
  return (
    <div className="gap-2 flex flex-col justify-center">
      <label>{label}</label>
      <div className="flex gap-1">
        {options.map((option, index) => (
          <RadioButton
            key={index}
            name={option.name}
            defaultValue={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export {
  CustomInput,
  CustomInput2,
  CustomSelect,
  CustomSelect2,
  CustomTextArea,
  CustomTextArea2,
  CustomRadioGroup,
};
