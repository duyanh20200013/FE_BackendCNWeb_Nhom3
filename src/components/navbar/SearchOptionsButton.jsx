import { FaSearch } from 'react-icons/fa';

function SearchOptionButton({ label, value, placeholder, withSearch, isSearch, type, active, onFocus, children }) {
  return (
    <div role="button" tabIndex={0} className="mt-[-1px] flex items-center" onFocus={onFocus}>
      <div
        className={`flex-grow flex items-center rounded-full ${
          active ? 'bg-white drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]' : 'hover:bg-neutral-300'
        }
        ${withSearch && 'pr-[9px]'}
        `}
      >
        <div className="flex flex-col flex-auto py-[14px] px-[24px] w-0">
          <span className="text-xs font-bold whitespace-nowrap"> {label} </span>
          {type === 'inputText' ? (
            <input
              type="text"
              name="location"
              id=""
              defaultValue={value}
              placeholder={placeholder}
              className="outline-none text-sm text-gray-500 bg-transparent"
            />
          ) : (
            <span className="text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">{placeholder}</span>
          )}
        </div>
        {withSearch && (
          <button
            className={`bg-primary flex items-center justify-center text-white w-12 font-semibold ${
              isSearch && 'w-auto px-4'
            } h-12 rounded-full`}
            onClick={() => console.log('Click Tìm kiếm')}
          >
            <FaSearch size={14} />
            {isSearch && <span className="pl-2 md:block hidden">Tìm kiếm</span>}
          </button>
        )}
      </div>

      <div className={`${active ? 'block mt-16' : 'hidden'}`}>{children}</div>
    </div>
  );
}

export default SearchOptionButton;
