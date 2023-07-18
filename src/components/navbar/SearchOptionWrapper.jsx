import { forwardRef } from 'react';

const SearchOptionWrapper = forwardRef(({ className, children }, ref) => {
  return (
    <div ref={ref} className={`${className} absolute px-8 py-4 mt-3 bg-white rounded-3xl drop-shadow-lg`}>
      {children}
    </div>
  );
});

export default SearchOptionWrapper;
