import FieldError from './FieldError';

function TextField({ id, name, value, type, placeholder, onChange, className, error, register = () => {} }) {
  return (
    <div>
      <input
        {...register(name)}
        id={id}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full h-14  border-1 focus:border-2 focus:outline-0 ${
          error ? 'border-error focus:border-error' : 'focus:border-black'
        } ${className}`}
        onChange={onChange}
      />
      {error && <FieldError error={error} />}
    </div>
  );
}

export default TextField;
