// InputField.jsx
export function InputField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  className = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block mb-1 text-left">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`mx-auto w-full p-2 border rounded bg-white ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-amber-400`}
      />
      {error && <span className="text-red-600 text-sm mt-1 block">{error}</span>}
    </div>
  );
}
