function GuestSearchWrapper({ label, description, children, borderBottom }) {
  return (
    <div>
      <div className={`flex py-6 justify-between items-center ${borderBottom && 'border-b-[1px]'}`}>
        <div>
          <h3 className="font-bold">{label}</h3>
          <p className="text-sm text-gray-500 pt-1">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default GuestSearchWrapper;
