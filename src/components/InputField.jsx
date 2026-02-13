
const InputField = ({ label, name, value, onChange, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-md px-4 py-3"
        {...rest}
      />
    </div>
  );
};

export default InputField;
