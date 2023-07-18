function AccountSettingBox({ onClick = () => {}, label, description, icon }) {
  const Icon = icon;

  return (
    <div
      className="p-4 flex flex-col justify-between items-start col-span-1 shadow-md border-[1px] rounded-xl cursor-pointer w-full"
      onClick={onClick}
    >
      <div className="pb-4">
        <Icon size={32}></Icon>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{label}</h3>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
    </div>
  );
}

export default AccountSettingBox;
