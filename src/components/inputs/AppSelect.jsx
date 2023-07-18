import { useState, useEffect } from 'react';
import Select from 'react-select';

function AppSelect({
  value,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  itemValue,
  ...props
}) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    if (itemValue) {
      setSelectedValue(
        options?.find(item => item[itemValue] === value) || value,
      );
    }
  }, [options]);

  console.log('Value: ', value, selectedValue);

  // useEffect(() => {
  //   setSelectedValue(null);
  // }, [options]);

  const handleOnChange = newValue => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <Select
      value={selectedValue}
      options={options}
      onChange={handleOnChange}
      isClearable
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      {...props}
      classNames={{
        control: () => 'py-[11px] px-[6px] border-2',
        input: () => 'text-base',
        option: () => 'text-base',
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6',
        },
      })}
    ></Select>
  );
}

export default AppSelect;
