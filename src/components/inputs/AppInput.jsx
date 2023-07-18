import { useForm } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

function AppInput({
  id,
  name,
  label,
  value,
  type,
  placeholder,
  error,
  formatPrice,
  disabled = false,
  min,
  max,
  register = () => {},
  onChange = () => {},
}) {
  return (
    <div className="w-full relative">
      {formatPrice && <BiDollar size={24} className="text-neutral-700 absolute top-1/2 left-2" />}
      <label
        className={`
         text-base font-semibold ${error ? 'text-rose-500' : ''}
    `}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        {...register(id)}
        placeholder={placeholder}
        onChange={onChange}
        className={`
            peer w-full p-4 font-normal bg-white border-[1px] m-[1px] focus:border-2 focus:m-0 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
              formatPrice ? 'pl-9' : 'pl-4'
            } ${error ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-700'}
        `}
      />
    </div>
  );
}

export default AppInput;
