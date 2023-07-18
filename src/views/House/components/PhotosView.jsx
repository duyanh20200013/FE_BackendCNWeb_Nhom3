import { IoIosArrowBack } from 'react-icons/io';
import HeartButton from '../../../components/HeartButton';

function PhotosView({ data, onClose }) {
  return (
    <div>
      <div className="flex justify-between px-6 py-4 sticky top-0 bg-white">
        <button className="hover:bg-neutral-100 rounded-full p-1" onClick={onClose}>
          <IoIosArrowBack size={20} />
        </button>
        <div>
          <button className="flex group hover:bg-neutral-100 p-1 rounded-md">
            <HeartButton />
            <span className="underline font-semibold ml-1">Lưu</span>
          </button>
        </div>
      </div>
      <div className="py-10 px-20">
        <div className="grid gap-2 grid-cols-2 grid-rows-[repeat(10,500px_250px)]">
          <div className="grid col-span-2 row-span-1 h-full">
            {data.houseImageIdData?.[0] && (
              <img src={data.houseImageIdData[0].url} alt="" className="aspect-[6/5] object-cover w-full h-full" />
            )}
          </div>
          <div className="grid gap-2 grid-cols-2 col-span-2">
            <div className="col-span-1">
              {data.houseImageIdData?.[0] && (
                <img src={data.houseImageIdData[0].url} alt="" className="aspect-[6/5] object-cover" />
              )}
            </div>
            <div className="col-span-1">
              {data.houseImageIdData?.[0] && (
                <img src={data.houseImageIdData[0].url} alt="" className="aspect-[6/5] object-cover" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotosView;
