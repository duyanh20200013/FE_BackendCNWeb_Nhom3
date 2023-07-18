import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useEffect, useState } from 'react';

function defaultFunction() {}

const defaultRange = [
  {
    startDate: new Date(),
    endDate: null,
    key: 'selection',
  },
];

/**
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Array} disabledDates
 * @param {Boolean} showDateDisplay
 * @param {Number} monthColumn
 * @param onChange
 */

function DatePicker({
  value,
  // dateRange = defaultRange,
  startDate = new Date(),
  endDate = null,
  disabledDates,
  showDateDisplay = false,
  monthColumn = 2,
  onChange = defaultFunction,
}) {
  const [range, setRange] = useState([
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ]);

  useEffect(() => {
    setRange([
      {
        startDate,
        endDate,
        key: 'selection',
      },
    ]);
  }, [startDate, endDate]);

  const fnSetRange = item => {
    setRange([item.selection]);
    onChange(item.selection);
    console.log(item.selection);
  };

  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={range}
      months={monthColumn}
      direction="horizontal"
      editableDateInputs={true}
      showDateDisplay={showDateDisplay}
      onChange={fnSetRange}
      disabledDates={disabledDates}
      minDate={new Date()}
      monthDisplayFormat="MMMM YYY"
      locale={locales['vi']}
      showPreview={false}
      dateDisplayFormat="MMM d, yyyy"
    />

    // <DateRange
    //   rangeColors={['#262626']}
    //   ranges={range}
    //   months={2}
    //   direction="horizontal"
    //   editableDateInputs={true}
    //   // showDateDisplay={false}
    //   // showSelectionPreview={true}
    //   onChange={fnSetRange}
    //   disabledDates={disabledDates}
    //   minDate={new Date()}
    //   monthDisplayFormat="MMMM YYY"
    // />
  );
}

export default DatePicker;
