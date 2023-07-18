import { useEffect } from 'react';

function CategoryInput({ label, onClick, selected, linkIcon }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 transition cursor-pointer 
    ${selected ? 'border-black focus:border-black' : 'border-neutral-200 hover:border-neutral-400'}`}
    >
      <img width="30" height="30" src={linkIcon} alt="" />
      <div className="font-semibold">{label}</div>
    </div>
  );
}

export default CategoryInput;
