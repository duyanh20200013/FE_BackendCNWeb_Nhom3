function Input({ id, name, value, type, placeholder, onChange, className, error, register = () => {} }) {
  return (
    <div>
      <input
        {...register(name)}
        id={id}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full h-14 focus:border-black border-1 focus:border-2 focus:outline-0 ${className}`}
        onChange={onChange}
      />
      {error && <p>{error?.message}</p>}
    </div>
  );
}

export default Input;
