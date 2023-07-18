import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

function AppCounter({ value, onIncrease, onDecrease, maxValue }) {
  return (
    <div className="flex items-center gap-4">
      <span role="button" onClick={onDecrease}>
        <CiCircleMinus className={`${value ? 'text-gray-500' : 'text-gray-200'}`} size={32} />
      </span>
      <div>{value} </div>
      <span role="button" onClick={onIncrease}>
        <CiCirclePlus size={32} className={`${value < maxValue ? 'text-gray-500' : 'text-gray-200'}`} />
      </span>
    </div>
  );
}

export default AppCounter;
