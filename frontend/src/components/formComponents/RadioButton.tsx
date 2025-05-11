const RadioButton = ({ id, name, value, label, onChange, checked }:any) => {
  return (
    <div className="flex items-center mb-2">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 block text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;