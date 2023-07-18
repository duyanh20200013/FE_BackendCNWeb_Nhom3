import { useNavigate } from 'react-router-dom';

function CategoryBox({ categoryId, label, linkIcon, isSelected = false }) {
  // const Icon = icon;
  const navigate = useNavigate();

  const handleLink = () => {
    navigate({
      pathname: '/',
      search: `?typeId=${categoryId}`,
    });
  };

  return (
    <div
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2 
        p-3 
        border-b-2
        hover:text-neutral-800 
        transition 
        cursor-pointer
        group
        ${isSelected ? 'border-b-neutral-800' : 'border-transparent'}
        ${isSelected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
      onClick={handleLink}
    >
      {/* <Icon size={26} /> */}
      <img width="24" height="24" src={linkIcon} alt="" className="opacity-60 group-hover:opacity-100" />
      <div className="font-medium text-sm whitespace-nowrap">{label}</div>
    </div>
  );
}

export default CategoryBox;
