import { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import qs from 'qs';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { getHouseOfType, searchHouse } from '@/api/houseApi';
import Modal from '@/components/modal/Modal';
import AppInput from '@/components/inputs/AppInput';
import AppCheckbox from '@/components/inputs/AppCheckbox';
import CategoryInput from '@/components/inputs/CategoryInput';
import Button from '@/components/Button';
import { getAllConvenient } from '@/api/houseApi';

const titleStyle = 'text-xl sm:text-2xl font-semibold pb-6';
const inputSectionStyle = 'py-6 border-b';

const houseTypeList = [
  {
    label: 'Nhà',
    icon: 'https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg',
  },
  {
    label: 'Căn hộ',
    icon: 'https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg',
  },
  {
    label: 'Nhà khách',
    icon: 'https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg',
  },
];

const convenientTypeObj = {
  ESSENTIAL: 'Đồ dùng thiết yếu',
  ATTRIBUTE: 'Đặc điểm',
  LOCATION: 'Vị trí',
  SECURE: 'An toàn',
};

// ['Đồ dùng thiết yếu', 'Đặc điểm', 'Vị trí', 'An toàn'];

const defaultFormData = {
  kindOfHouse: [],
  typeId: null,
  provinceCode: null,
  districtCode: null,
  countBed: '',
  countBedroom: '',
  countBathroom: '',
  guest: null,
  convenients: [],
  minPrice: 0,
  maxPrice: '',
  time: {
    arriveDate: null,
    leftDate: null,
  },
};

function FilterModal(props) {
  const [data, setData] = useState({ ...defaultFormData });

  const [convenients, setConvenients] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = location.search;

  useEffect(() => {
    fetchAllConvenient();
  }, []);

  // useEffect(() => {
  //   console.log('re-render Filter Modal');
  //   console.log(data);
  // });

  const handleInput = e => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const fetchAllConvenient = async () => {
    const res = await getAllConvenient();
    setConvenients(res.data.data);
  };

  const setKindOfHouseData = item => {
    let index = data?.kindOfHouse.indexOf(item);

    if (index !== -1) {
      console.log('a');
      data.kindOfHouse.splice(index, 1);
      const kindOfHouse = data.kindOfHouse;
      setData({ ...data, kindOfHouse });
    } else {
      data.kindOfHouse.push(item);
      const kindOfHouse = data.kindOfHouse;
      setData({ ...data, kindOfHouse });
      console.log(data.kindOfHouse.includes(item));
    }

    console.log(data.kindOfHouse);
  };

  // Use for checkboxes
  const setConvenientData = e => {
    console.log(e.target.value);
    const { value, checked } = e.target;

    console.log(typeof value);

    const tmpConvenient = data.convenients;
    if (checked) {
      setData({ ...data, convenients: [...tmpConvenient, value * 1] });
    } else {
      setData({
        ...data,
        convenients: tmpConvenient.filter(checkbox => checkbox !== value * 1),
      });
    }
  };

  const resetForm = () => {
    setData({
      kindOfHouse: [],
      typeId: null,
      provinceCode: null,
      districtCode: null,
      countBed: '',
      countBedroom: '',
      countBathroom: '',
      guest: null,
      convenients: [],
      minPrice: 0,
      maxPrice: '',
      time: {
        arriveDate: null,
        leftDate: null,
      },
    });
  };

  const handleSearch = async () => {
    console.log(data);
    let paramsData = qs.parse(queryParams, { ignoreQueryPrefix: true });
    let formData = { ...data, ...paramsData };
    console.log('Submit form:', formData);
    handleLink(qs.stringify(formData));

    // async function getHouseList() {
    //   try {
    //     const res = await searchHouse(paramsData);
    //     setHouseList(res.data.data);
    //   } catch (err) {
    //     alert(err);
    //   }
    // }
  };

  const handleLink = queryParamsStr => {
    navigate({
      pathname: '/',
      search: `?${queryParamsStr}`,
    });
    props?.onClose();
  };

  // Action Element on the bottom of fitler modal
  const ActionElements = () => {
    return (
      <div className="flex justify-between items-center">
        <button
          className="font-semibold underline p-[10px] m-[-10px]"
          onClick={resetForm}
        >
          Xóa tất cả
        </button>
        <div className="max-w-[200px]">
          <Button label="Tìm kiếm" onClick={handleSearch} />
        </div>
      </div>
    );
  };

  return (
    <Modal {...props} title="Bộ lọc" action={ActionElements}>
      <div>
        {/* Price Input */}
        <div className="pb-8 border-b pt-2">
          <h2 className={`${titleStyle}`}>Khoảng giá</h2>
          <div className="flex justify-between gap-2">
            <AppInput
              value={data.minPrice}
              name="minPrice"
              label="Tối thiểu"
              type="number"
              onChange={handleInput}
              formatPrice
            />
            <AppInput
              value={data.maxPrice}
              name="maxPrice"
              label="Tối đa"
              type="number"
              onChange={handleInput}
              formatPrice
            />
          </div>
        </div>

        {/* Bedroom */}
        <div className="py-6 border-b">
          <h2 className={`${titleStyle}`}>Phòng ngủ, giường và phòng tắm</h2>
          <div className="flex flex-col gap-2">
            <AppInput
              value={data.countBed}
              name="countBed"
              label="Phòng ngủ"
              type="number"
              onChange={handleInput}
            />
            <AppInput
              value={data.countBedroom}
              name="countBedroom"
              label="Giường"
              type="number"
              onChange={handleInput}
            />
            <AppInput
              value={data.countBathroom}
              name="countBathroom"
              label="Phòng tắm"
              type="number"
              onChange={handleInput}
            />
          </div>
        </div>

        {/* House Type */}
        <div className={`${inputSectionStyle}`}>
          <h2 className={`${titleStyle}`}>Loại nhà/phòng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {houseTypeList.map(item => {
              return (
                <div key={item.label} className="col-span-1">
                  <CategoryInput
                    onClick={() => setKindOfHouseData(item.label)}
                    selected={data.kindOfHouse.includes(item.label)}
                    label={item.label}
                    linkIcon={item.icon}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className={`${inputSectionStyle} border-b-0`}>
          <h2 className={`${titleStyle}`}>Tiện nghi</h2>
          <div className="grid grid-cols-2">
            <div className="col-span-2 pt-2 mb-1">
              <h3 className="font-semibold">{convenientTypeObj.ESSENTIAL}</h3>
            </div>

            {convenients.map(item => {
              if (item?.typeConvenient == convenientTypeObj.ESSENTIAL) {
                return (
                  <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
                    <AppCheckbox
                      value={item.id}
                      label={item.name}
                      onChange={setConvenientData}
                      checked={data.convenients.includes(item.id)}
                    />
                  </div>
                );
              }
            })}
            <div className="col-span-2 mt-6 mb-1">
              <h3 className="font-semibold">{convenientTypeObj.ATTRIBUTE}</h3>
            </div>
            {convenients.map(item => {
              if (item?.typeConvenient == convenientTypeObj.ATTRIBUTE) {
                return (
                  <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
                    <AppCheckbox
                      value={item.id}
                      label={item.name}
                      onChange={setConvenientData}
                      checked={data.convenients.includes(item.id)}
                    />
                  </div>
                );
              }
            })}
            <div className="col-span-2 mt-6 mb-1">
              <h3 className="font-semibold">{convenientTypeObj.LOCATION}</h3>
            </div>
            {convenients.map(item => {
              if (item?.typeConvenient == convenientTypeObj.LOCATION) {
                return (
                  <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
                    <AppCheckbox
                      value={item.id}
                      label={item.name}
                      onChange={setConvenientData}
                      checked={data.convenients.includes(item.id)}
                    />
                  </div>
                );
              }
            })}
            <div className="col-span-2 mt-6 mb-1">
              <h3 className="font-semibold">{convenientTypeObj.SECURE}</h3>
            </div>
            {convenients.map(item => {
              if (item?.typeConvenient == convenientTypeObj.SECURE) {
                return (
                  <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
                    <AppCheckbox
                      value={item.id}
                      label={item.name}
                      onChange={setConvenientData}
                      checked={data.convenients.includes(item.id)}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FilterModal;
