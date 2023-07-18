import { memo } from 'react';
import { useState } from 'react';

function EditBox({ onSubmit, disabledSubmit, titleElement, editElement }) {
  const [isEdit, setIsEdit] = useState(false);

  const fnSubmit = e => {
    onSubmit();
    e.preventDefault();
  };

  return (
    <div className="mb-6 pb-6 border-b-[1px]">
      {isEdit ? (
        <div className="rounded-2xl border-[1px] pt-6">
          <div className="px-6 mb-8">{editElement}</div>

          {/* Action */}
          <div className="mt-4 px-6 py-4 border-t-[1px] flex justify-between">
            <div
              role="button"
              className="font-medium underline hover:bg-gray-100 py-2 px-2 rounded-xl"
              onClick={() => setIsEdit(false)}
            >
              Hủy
            </div>
            <button
              onClick={fnSubmit}
              className={`px-4 py-2 text-white rounded-xl font-medium opacity-90 hover:opacity-100 ${
                disabledSubmit ? 'bg-[#DDDDDD]' : 'bg-[#222222]'
              }`}
            >
              Lưu
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          {titleElement}
          <div
            className="font-semibold underline cursor-pointer"
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(EditBox);
