import { memo } from 'react';
import { useState } from 'react';

function EditBox({ onShow, onHide, onSubmit, disabledSubmit, children }) {
  const fnSubmit = e => {
    onSubmit();
    e.preventDefault();
  };

  return (
    <form onSubmit={fnSubmit} className="rounded-2xl border-[1px] pt-6">
      <div className="px-6 mb-8">{children}</div>

      {/* Action */}
      <div className="mt-4 px-6 py-4 border-t-[1px] flex justify-between">
        <div
          role="button"
          className="font-medium underline hover:bg-gray-100 py-2 px-2 rounded-xl"
          onClick={onHide}
        >
          Hủy
        </div>
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-xl font-medium opacity-90 hover:opacity-100 ${
            disabledSubmit ? 'bg-[#DDDDDD]' : 'bg-[#222222]'
          }`}
        >
          Lưu
        </button>
      </div>
    </form>
  );
}

export default memo(EditBox);
