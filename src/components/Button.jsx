function Button({ label, onClick, disabled, outline, small, icon, className }) {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
			relative
			disabled:opacity-70
			disabled:cursor-not-allowed
			rounded-lg
			hover:opacity-80
			trasition
			w-full
			border-[1px]
			${outline ? 'bg-white' : 'bg-rose-500'}
			${outline ? 'border-black' : 'border-rose-500'}
			${outline ? 'text-black' : 'text-white'}
			${small ? 'py-1' : 'py-3'}
			${small ? 'px-2' : 'px-4'}
			${small ? 'text-sm' : 'text-md'}
			${small ? 'font-normal' : 'font-semibold'}
			// ${small ? 'border-[1px]' : 'border-2'}
			 ${className}
		`}
    >
      <div className="flex items-center">
        {Icon && <Icon size={20} className="pr-1" />}
        <div className="flex-1">{label}</div>
      </div>
    </button>
  );
}

export default Button;
