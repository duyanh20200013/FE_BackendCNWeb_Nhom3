import AppCounter from '../AppCounter';

function AppCounterLabel({
  label,
  borderBottom,
  value,
  onIncrease,
  onDecrease,
  disableDecrease,
  disableIncrease,
}) {
  return (
    <div>
      <div
        className={`flex py-6 justify-between items-center ${borderBottom && 'border-b-[1px]'
          }`}
      >
        <div>
          <h3 className="font-normal text-lg">{label}</h3>
        </div>
        <AppCounter
          value={value || 0}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          disableDecrease={disableDecrease}
          disableIncrease={disableIncrease}
          maxValue={20}
        />
      </div>
    </div>
  );
}

export default AppCounterLabel;
