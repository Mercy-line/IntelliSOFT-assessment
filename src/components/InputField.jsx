const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-serif"
      />
    </div>
  );
};

export default InputField;
