import { RiErrorWarningFill } from 'react-icons/ri';

function FieldError({ error }) {
  return (
    <div className="flex items-center text-left my-1">
      <RiErrorWarningFill className="text-error" size={20} />
      <p className="text-error text-xs ml-1">{error?.message}</p>
    </div>
  );
}

export default FieldError;
