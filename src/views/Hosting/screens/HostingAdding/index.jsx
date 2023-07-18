import Select from 'react-select';

import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import {
  getAllHouseType,
  getAllConvenient,
  getAllProvince,
  getAllDistrictOfProvince,
} from '@/api/houseApi';
import { createHouse } from '@/api/ownerApi';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryInput from '@/components/inputs/CategoryInput';
import AppCounterLabel from '@/components/inputs/AppCounterLabel';
import AppCheckbox from '@/components/inputs/AppCheckbox';
import ImagesUploading from './components/ImagesUploading';
import DescriptionMarkdown from './components/DescriptionMarkdown';
import AppSelect from '@/components/inputs/AppSelect';
import AppInput from '@/components/inputs/AppInput';
import AppMap from './components/AppMap';
import Global from '@/general/Global';

const headerStyle = 'font-bold text-[32px] max-w-[640px] mb-8';

const houseKindList = Global.houseKindList;

const STEP = {
  HOUSE_TYPE: 0,
  HOUSE_KIND: 1,
  LOCATION: 2,
  INFO: 3, //BED
  CONVENIENT: 4,
  IMAGE: 5,
  NAME: 6,
  DESCRIPTION: 7,
  PRICE: 8,
};

const defaultFormData = {
  provinceCode: null,
  districtCode: null,
  name: null,
  title: null,
  price: 10,
  House_Info: {
    kindOfHouse: null,
    descriptionHTML: null,
    descriptionMarkDown: null,
    address: '',
    addressDescription: '',
    maxGuests: 1,
    allowAnimals: true,
    countBed: 1,
    countBedRoom: 1,
    countBathRoom: 1,
  },
  House_Image: [],
  House_Type: [],
  House_Convenient: [],
};

const convenientTypeObj = {
  ESSENTIAL: 'Đồ dùng thiết yếu',
  ATTRIBUTE: 'Đặc điểm',
  LOCATION: 'Vị trí',
  SECURE: 'An toàn',
};

function HostingAdding() {
  const [step, setStep] = useState(0);
  const [houseTypeList, setHouseTypeList] = useState([]);
  const [convenients, setConvenients] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [isDisableNext, setIsDisableNext] = useState(false);
  const [isDisableSubmit, setIsDisableSubmit] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultFormData,
  });

  const {
    kindOfHouse,
    maxGuests,
    countBedRoom,
    countBed,
    countBathRoom,
    descriptionHTML,
    address,
    addressDescription,
  } = watch('House_Info');
  const houseType = watch('House_Type');
  const houseConvenients = watch('House_Convenient');
  const houseImage = watch('House_Image');
  const provinceCode = watch('provinceCode');
  const districtCode = watch('districtCode');
  const houseName = watch('name');
  const houseTitle = watch('title');
  const housePrice = watch('price');

  const navigate = useNavigate();

  useEffect(() => {
    fetchHouseType();
    fetchConvenients();
    fetchProvinceList();
  }, []);

  const onBack = () => {
    setStep(value => value - 1);
  };

  const onNext = () => {
    setStep(value => value + 1);
  };

  // const handleSetValue = (field, value) => {
  //   setValue(field, value, {

  //   })
  // }
  const selectHouseType = val => {
    let idx = houseType.findIndex(item => item === val);
    if (idx >= 0) {
      setValue('House_Type', [...houseType.filter(item => item !== val * 1)]);
    } else {
      setValue('House_Type', [...houseType, val * 1]);
    }
  };

  const setConvenientData = e => {
    const { value, checked } = e.target;
    if (checked) {
      setValue('House_Convenient', [...houseConvenients, value * 1]);
      // setData({ ...data, convenients: [...tmpConvenient, value * 1] });
    } else {
      setValue('House_Convenient', [
        ...houseConvenients.filter(item => item !== value * 1),
      ]);
      // setData({ ...data, convenients: tmpConvenient.filter(checkbox => checkbox !== value * 1) });
    }
  };

  const fetchProvinceList = async () => {
    try {
      const res = await getAllProvince();
      setProvinceList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDistrictList = async provinceCode => {
    try {
      const res = await getAllDistrictOfProvince({ provinceCode });
      setDistrictList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Set Search data's provinceCode
  const fnSetProvince = selected => {
    console.log(selected);
    if (selected) {
      setValue('provinceCode', selected);
      fetchDistrictList(selected?.code);
    } else {
      setValue('provinceCode', null);
      setValue('districtCode', null);
      setDistrictList([]);
    }
  };

  // Set Search data's districtCode
  const fnSetDistrict = selected => {
    setValue('districtCode', selected || null);
    console.log('District', selected);
  };

  useEffect(() => {
    console.log('House image: ', houseImage);
  }, [houseImage]);
  const setImageData = imageUrls => {
    const imagesArray = imageUrls?.map(image => ({ url: image }));
    console.log('Images array: ', imagesArray);

    setValue('House_Image', [...imagesArray]);

    console.log('Set image ', houseImage);
  };

  // Set disable next button
  useEffect(() => {
    switch (step) {
      case STEP.HOUSE_TYPE:
        if (houseType.length) setIsDisableNext(false);
        else setIsDisableNext(true);
        break;
      case STEP.HOUSE_KIND:
        break;
      case STEP.LOCATION:
        break;
      case STEP.INFO:
        break;
      case STEP.CONVENIENT:
        break;
      case STEP.IMAGE:
        break;
      case STEP.NAME:
        break;
      case STEP.DESCRIPTION:
        break;
      case STEP.PRICE:
        break;
      default:
        break;
    }
  }, [
    step,
    houseTypeList,
    houseType,
    kindOfHouse,
    maxGuests,
    countBedRoom,
    countBed,
    countBathRoom,
    houseConvenients,
  ]);

  const bodyContent = useMemo(() => {
    switch (step) {
      case STEP.HOUSE_TYPE:
        if (houseType.length) setIsDisableNext(false);
        else {
          setIsDisableNext(true);
        }
        return (
          <>
            <h1 className={`${headerStyle}`}>
              Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn?
            </h1>
            <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
              {houseTypeList?.map(item => {
                return (
                  <div key={item?.name} className="col-span-1">
                    <CategoryInput
                      onClick={() => selectHouseType(item?.id)}
                      selected={houseType.includes(item?.id)}
                      label={item?.name}
                      linkIcon={item?.linkIcon}
                    />
                  </div>
                );
              })}
            </div>
          </>
        );
      case STEP.HOUSE_KIND:
        if (kindOfHouse?.length) {
          setIsDisableNext(false);
        } else {
          setIsDisableNext(true);
        }
        return (
          <div className="sm:w-[640px]">
            <h1 className={`${headerStyle}`}>
              Miêu tả về căn nhà/phòng của bạn
            </h1>
            <div className="grid grid-cols-1 gap-3">
              {houseKindList?.map(item => {
                return (
                  <div key={item?.label} className="col-span-1">
                    <CategoryInput
                      onClick={() =>
                        setValue('House_Info.kindOfHouse', item.label)
                      }
                      selected={kindOfHouse === item.label}
                      label={item?.label}
                      linkIcon={item?.icon}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      case STEP.LOCATION:
        if (provinceCode && districtCode && address != '') {
          setIsDisableNext(false);
        } else {
          setIsDisableNext(true);
        }

        return (
          <div className="sm:w-[640px]">
            <h1 className={`${headerStyle}`}>Chỗ ở của bạn nằm ở đâu?</h1>
            {/* <AppMap /> */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-base font-medium">Tỉnh/Thành phố</label>
                <AppSelect
                  options={provinceList}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.code}
                  value={provinceCode}
                  onChange={fnSetProvince}
                />
              </div>
              <div>
                <label className="text-base font-medium">
                  Thành phố/Quận/Huyện
                </label>
                <AppSelect
                  options={districtList}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.code}
                  value={districtCode}
                  onChange={fnSetDistrict}
                />
              </div>
              <AppInput
                label="Dòng địa chỉ 1"
                value={address}
                onChange={e => {
                  setValue('House_Info.address', e.target.value);
                }}
              />
              <AppInput
                label="Dòng địa chỉ 2"
                value={addressDescription}
                onChange={e => {
                  setValue('House_Info.addressDescription', e.target.value);
                }}
              />
            </div>
          </div>
        );
      case STEP.INFO:
        return (
          <div>
            <header className={`${headerStyle}`}>
              Chia sẻ một số thông tin cơ bản về chỗ ở của bạn
              <h3 className="text-gray-500 text-lg font-medium mt-2">
                Sau này, bạn sẽ bổ sung những thông tin khác, như loại giường
                chẳng hạn.
              </h3>
            </header>

            <div className="flex flex-col">
              <AppCounterLabel
                value={maxGuests}
                disableDecrease={maxGuests == 1}
                onIncrease={() => {
                  setValue('House_Info.maxGuests', maxGuests + 1);
                }}
                onDecrease={() => {
                  setValue('House_Info.maxGuests', maxGuests - 1);
                }}
                label="Khách"
                borderBottom
              />
              <AppCounterLabel
                value={countBedRoom}
                disableDecrease={countBedRoom == 0}
                onIncrease={() => {
                  setValue('House_Info.countBedRoom', countBedRoom + 1);
                }}
                onDecrease={() => {
                  setValue('House_Info.countBedRoom', countBedRoom - 1);
                }}
                label="Phòng ngủ"
                borderBottom
              />
              <AppCounterLabel
                value={countBed}
                disableDecrease={countBed == 1}
                onIncrease={() => {
                  setValue('House_Info.countBed', countBed + 1);
                }}
                onDecrease={() => {
                  setValue('House_Info.countBed', countBed - 1);
                }}
                label="Giường"
                borderBottom
              />
              <AppCounterLabel
                value={countBathRoom}
                disableDecrease={countBathRoom == 1}
                onIncrease={() => {
                  setValue('House_Info.countBathRoom', countBathRoom + 1);
                }}
                onDecrease={() => {
                  setValue('House_Info.countBathRoom', countBathRoom - 1);
                }}
                label="Phòng tắm"
              />
            </div>
          </div>
        );
      case STEP.CONVENIENT:
        return (
          <div>
            <header className={`${headerStyle}`}>
              Cho khách biết chỗ ở của bạn có những gì
              <h3 className="text-gray-500 text-lg font-medium mt-2">
                Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê.
              </h3>
            </header>

            <div className="grid grid-cols-2">
              {/* Essential Convenient */}
              <div className="col-span-2 mt-6 mb-1">
                <h3 className="font-semibold text-lg">
                  Bạn có những đồ dùng thiết yếu nào?
                </h3>
              </div>
              {convenients.map(item => {
                if (item?.typeConvenient == convenientTypeObj.ESSENTIAL) {
                  return (
                    <div
                      key={item.id}
                      className="sm:col-span-1 col-span-2 py-3"
                    >
                      <AppCheckbox
                        value={item?.id}
                        label={item?.name}
                        onChange={setConvenientData}
                        checked={houseConvenients.includes(item.id)}
                      />
                    </div>
                  );
                }
              })}

              {/* Attribute Convenient */}
              <div className="col-span-2 mt-6 mb-1">
                <h3 className="font-semibold text-lg">
                  Bạn có tiện nghi nào nổi bật không?
                </h3>
              </div>
              {convenients.map(item => {
                if (item?.typeConvenient == convenientTypeObj.ATTRIBUTE) {
                  return (
                    <div
                      key={item.id}
                      className="sm:col-span-1 col-span-2 py-3"
                    >
                      <AppCheckbox
                        value={item?.id}
                        label={item?.name}
                        onChange={setConvenientData}
                        checked={houseConvenients.includes(item.id)}
                      />
                    </div>
                  );
                }
              })}

              {/* Location Convenient */}
              <div className="col-span-2 mt-6 mb-1">
                <h3 className="font-semibold text-lg">
                  Căn nhà/phòng có đặc điểm vị trí nào sau đây không?
                </h3>
              </div>
              {convenients.map(item => {
                if (item?.typeConvenient == convenientTypeObj.LOCATION) {
                  return (
                    <div
                      key={item.id}
                      className="sm:col-span-1 col-span-2 py-3"
                    >
                      <AppCheckbox
                        value={item?.id}
                        label={item?.name}
                        onChange={setConvenientData}
                        checked={houseConvenients.includes(item.id)}
                      />
                    </div>
                  );
                }
              })}

              {/* Secure Convenient */}
              <div className="col-span-2 mt-6 mb-1">
                <h3 className="font-semibold text-lg">
                  Bạn có tiện nghi nào trong số những tiện nghi đảm bảo an toàn
                  sau đây không?
                </h3>
              </div>
              {convenients.map(item => {
                if (item?.typeConvenient == convenientTypeObj.SECURE) {
                  return (
                    <div
                      key={item.id}
                      className="sm:col-span-1 col-span-2 py-3"
                    >
                      <AppCheckbox
                        value={item?.id}
                        label={item?.name}
                        onChange={setConvenientData}
                        checked={houseConvenients.includes(item.id)}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      case STEP.IMAGE:
        setIsDisableNext(true);
        return (
          <ImagesUploading
            setImages={setImageData}
            images={houseImage?.map(image => image?.url)}
            onUploaded={() => setIsDisableNext(false)}
            onUploading={() => setIsDisableNext(true)}
          />
        );
      case STEP.NAME:
        if (houseName && houseTitle) {
          setIsDisableNext(false);
        } else {
          setIsDisableNext(true);
        }
        return (
          <div>
            <header className={`${headerStyle}`}>
              Bây giờ, hãy đặt tên và tiêu đề cho chỗ ở thuộc danh mục lâu đài
              của bạn
              <h3 className="text-gray-500 text-lg font-medium mt-2">
                Tên và tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn
                luôn có thể thay đổi tên và tiêu đề sau.
              </h3>
            </header>

            <div className="flex flex-col gap-4">
              <textarea
                className="border border-gray-400 rounded-lg w-full p-6 text-xl"
                placeholder="Name of your place"
                {...register('name')}
              ></textarea>
              <textarea
                className="border border-gray-400 rounded-lg w-full p-6 text-xl"
                placeholder="Title"
                {...register('title')}
              ></textarea>
            </div>
          </div>
        );
      case STEP.DESCRIPTION:
        return (
          <div>
            <header className={`${headerStyle}`}>
              Tạo phần mô tả
              <h3 className="text-gray-500 text-lg font-medium mt-2">
                Chia sẻ những điều tạo nên nét đặc biệt cho chỗ ở của bạn.
              </h3>
            </header>
            <DescriptionMarkdown
              htmlContent={descriptionHTML}
              onChangeHtml={value =>
                setValue('House_Info.descriptionHTML', value)
              }
              onChangeMarkdown={value =>
                setValue('House_Info.descriptionMarkDown', value)
              }
            />
          </div>
        );
      case STEP.PRICE:
        if (housePrice) setIsDisableSubmit(false);
        else setIsDisableSubmit(true);
        return (
          <div>
            <header className={`${headerStyle}`}>
              Bây giờ, hãy đặt mức giá bạn muốn
              <h3 className="text-gray-500 text-lg font-medium mt-2">
                Bạn có thể thay đổi giá này bất cứ lúc nào.
              </h3>
            </header>
            <div>
              <label htmlFor="" className="text-lg font-medium text-gray-700">
                Giá ($)
                <input
                  type="number"
                  {...register('price')}
                  min={1}
                  className="border border-gray-400 rounded-lg w-full p-6 text-xl"
                />
              </label>
            </div>
          </div>
        );
    }
  }, [
    step,
    houseTypeList,
    provinceList,
    districtList,
    houseType,
    kindOfHouse,
    maxGuests,
    countBedRoom,
    countBed,
    countBathRoom,
    houseConvenients,
    provinceCode,
    districtCode,
    address,
    houseName,
    houseTitle,
    housePrice,
  ]);

  // let bodyContent;
  // if (step == STEP.HOUSE_TYPE) {
  //   if (houseType.length) setIsDisableNext(false);
  //   else {
  //     setIsDisableNext(true);
  //   }
  //   bodyContent = (
  //     <>
  //       <h1 className={`${headerStyle}`}>Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn?</h1>
  //       <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
  //         {houseTypeList?.map(item => {
  //           return (
  //             <div key={item?.name} className="col-span-1">
  //               <CategoryInput
  //                 onClick={() => selectHouseType(item?.id)}
  //                 selected={houseType.includes(item?.id)}
  //                 label={item?.name}
  //                 linkIcon={item?.linkIcon}
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </>
  //   );
  // }
  // if (step == STEP.HOUSE_KIND) {
  //   if (kindOfHouse?.length) {
  //     setIsDisableNext(false);
  //   } else {
  //     setIsDisableNext(true);
  //   }
  //   bodyContent = (
  //     <div className="sm:w-[640px]">
  //       <h1 className={`${headerStyle}`}>Miêu tả về căn nhà/phòng của bạn</h1>
  //       <div className="grid grid-cols-1 gap-3">
  //         {houseKindList?.map(item => {
  //           return (
  //             <div key={item?.label} className="col-span-1">
  //               <CategoryInput
  //                 onClick={() => setValue('House_Info.kindOfHouse', item.label)}
  //                 selected={kindOfHouse === item.label}
  //                 label={item?.label}
  //                 linkIcon={item?.icon}
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }
  // if (step == STEP.LOCATION) {
  //   if (provinceCode && districtCode) {
  //     setIsDisableNext(false);
  //   } else {
  //     setIsDisableNext(true);
  //   }

  //   bodyContent = (
  //     <div className="sm:w-[640px]">
  //       <h1 className={`${headerStyle}`}>Chỗ ở của bạn nằm ở đâu?</h1>
  //       {/* <AppMap /> */}
  //       <div className="flex flex-col gap-6">
  //         <div>
  //           <label className="text-base font-medium">Tỉnh/Thành phố</label>
  //           <AppSelect
  //             options={provinceList}
  //             getOptionLabel={option => option.name}
  //             getOptionValue={option => option.code}
  //             defaultValue={provinceCode}
  //             onChange={fnSetProvince}
  //           />
  //         </div>
  //         <div>
  //           <label className="text-base font-medium">Thành phố/Quận/Huyện</label>
  //           <AppSelect
  //             options={districtList}
  //             getOptionLabel={option => option.name}
  //             getOptionValue={option => option.code}
  //             defaultValue={districtCode}
  //             onChange={fnSetDistrict}
  //           />
  //         </div>
  //         <AppInput label="Dòng địa chỉ 1" />
  //         <AppInput label="Dòng địa chỉ 2" />
  //       </div>
  //     </div>
  //   );
  // }
  // if (step == STEP.INFO) {
  //   bodyContent = (
  //     <div>
  //       <header className={`${headerStyle}`}>
  //         Chia sẻ một số thông tin cơ bản về chỗ ở của bạn
  //         <h3 className="text-gray-500 text-lg font-medium mt-2">
  //           Sau này, bạn sẽ bổ sung những thông tin khác, như loại giường chẳng hạn.
  //         </h3>
  //       </header>

  //       <div className="flex flex-col">
  //         <AppCounterLabel
  //           value={maxGuests}
  //           disableDecrease={maxGuests == 1}
  //           onIncrease={() => {
  //             setValue('House_Info.maxGuests', maxGuests + 1);
  //           }}
  //           onDecrease={() => {
  //             setValue('House_Info.maxGuests', maxGuests - 1);
  //           }}
  //           label="Khách"
  //           borderBottom
  //         />
  //         <AppCounterLabel
  //           value={countBedRoom}
  //           disableDecrease={countBedRoom == 0}
  //           onIncrease={() => {
  //             setValue('House_Info.countBedRoom', countBedRoom + 1);
  //           }}
  //           onDecrease={() => {
  //             setValue('House_Info.countBedRoom', countBedRoom - 1);
  //           }}
  //           label="Phòng ngủ"
  //           borderBottom
  //         />
  //         <AppCounterLabel
  //           value={countBed}
  //           disableDecrease={countBed == 1}
  //           onIncrease={() => {
  //             setValue('House_Info.countBed', countBed + 1);
  //           }}
  //           onDecrease={() => {
  //             setValue('House_Info.countBed', countBed - 1);
  //           }}
  //           label="Giường"
  //           borderBottom
  //         />
  //         <AppCounterLabel
  //           value={countBathRoom}
  //           disableDecrease={countBathRoom == 1}
  //           onIncrease={() => {
  //             setValue('House_Info.countBathRoom', countBathRoom + 1);
  //           }}
  //           onDecrease={() => {
  //             setValue('House_Info.countBathRoom', countBathRoom - 1);
  //           }}
  //           label="Phòng tắm"
  //         />
  //       </div>
  //     </div>
  //   );
  // }
  // if (step == STEP.CONVENIENT) {
  //   bodyContent = (
  //     <div>
  //       <header className={`${headerStyle}`}>
  //         Cho khách biết chỗ ở của bạn có những gì
  //         <h3 className="text-gray-500 text-lg font-medium mt-2">
  //           Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê.
  //         </h3>
  //       </header>

  //       <div className="grid grid-cols-2">
  //         {/* Essential Convenient */}
  //         <div className="col-span-2 mt-6 mb-1">
  //           <h3 className="font-semibold text-lg">Bạn có những đồ dùng thiết yếu nào?</h3>
  //         </div>
  //         {convenients.map(item => {
  //           if (item?.typeConvenient == convenientTypeObj.ESSENTIAL) {
  //             return (
  //               <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
  //                 <AppCheckbox
  //                   value={item?.id}
  //                   label={item?.name}
  //                   onChange={setConvenientData}
  //                   checked={houseConvenients.includes(item.id)}
  //                 />
  //               </div>
  //             );
  //           }
  //         })}

  //         {/* Attribute Convenient */}
  //         <div className="col-span-2 mt-6 mb-1">
  //           <h3 className="font-semibold text-lg">Bạn có tiện nghi nào nổi bật không?</h3>
  //         </div>
  //         {convenients.map(item => {
  //           if (item?.typeConvenient == convenientTypeObj.ATTRIBUTE) {
  //             return (
  //               <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
  //                 <AppCheckbox
  //                   value={item?.id}
  //                   label={item?.name}
  //                   onChange={setConvenientData}
  //                   checked={houseConvenients.includes(item.id)}
  //                 />
  //               </div>
  //             );
  //           }
  //         })}

  //         {/* Location Convenient */}
  //         <div className="col-span-2 mt-6 mb-1">
  //           <h3 className="font-semibold text-lg">Căn nhà/phòng có đặc điểm vị trí nào sau đây không?</h3>
  //         </div>
  //         {convenients.map(item => {
  //           if (item?.typeConvenient == convenientTypeObj.LOCATION) {
  //             return (
  //               <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
  //                 <AppCheckbox
  //                   value={item?.id}
  //                   label={item?.name}
  //                   onChange={setConvenientData}
  //                   checked={houseConvenients.includes(item.id)}
  //                 />
  //               </div>
  //             );
  //           }
  //         })}

  //         {/* Secure Convenient */}
  //         <div className="col-span-2 mt-6 mb-1">
  //           <h3 className="font-semibold text-lg">
  //             Bạn có tiện nghi nào trong số những tiện nghi đảm bảo an toàn sau đây không?
  //           </h3>
  //         </div>
  //         {convenients.map(item => {
  //           if (item?.typeConvenient == convenientTypeObj.SECURE) {
  //             return (
  //               <div key={item.id} className="sm:col-span-1 col-span-2 py-3">
  //                 <AppCheckbox
  //                   value={item?.id}
  //                   label={item?.name}
  //                   onChange={setConvenientData}
  //                   checked={houseConvenients.includes(item.id)}
  //                 />
  //               </div>
  //             );
  //           }
  //         })}
  //       </div>
  //     </div>
  //   );
  // }
  // if (step == STEP.IMAGE) {
  //   bodyContent = <ImagesUploading setImages={setImageData} images={houseImage?.map(image => image?.url)} />;
  // }
  // if (step == STEP.NAME) {
  //   bodyContent = (
  //     <div>
  //       <header className={`${headerStyle}`}>
  //         Bây giờ, hãy đặt tên và tiêu đề cho chỗ ở thuộc danh mục lâu đài của bạn
  //         <h3 className="text-gray-500 text-lg font-medium mt-2">
  //           Tên và tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tên và tiêu đề sau.
  //         </h3>
  //       </header>

  //       <div className="flex flex-col gap-4">
  //         <textarea
  //           className="border border-gray-400 rounded-lg w-full p-6 text-xl"
  //           placeholder="Name of your place"
  //           {...register('name')}
  //         ></textarea>
  //         <textarea
  //           className="border border-gray-400 rounded-lg w-full p-6 text-xl"
  //           placeholder="Title"
  //           {...register('info')}
  //         ></textarea>
  //       </div>
  //     </div>
  //   );
  // }
  // if (step == STEP.DESCRIPTION) {
  //   bodyContent = (
  //     <div>
  //       <header className={`${headerStyle}`}>
  //         Tạo phần mô tả
  //         <h3 className="text-gray-500 text-lg font-medium mt-2">
  //           Chia sẻ những điều tạo nên nét đặc biệt cho chỗ ở của bạn.
  //         </h3>
  //       </header>
  //       <DescriptionMarkdown
  //         htmlContent={descriptionHTML}
  //         onChangeHtml={value => setValue('House_Info.descriptionHTML', value)}
  //         onChangeMarkdown={value => setValue('House_Info.descriptionMarkDown', value)}
  //       />
  //     </div>
  //   );
  // }
  // if (step == STEP.PRICE) {
  //   bodyContent = (
  //     <div>
  //       <header className={`${headerStyle}`}>
  //         Bây giờ, hãy đặt mức giá bạn muốn
  //         <h3 className="text-gray-500 text-lg font-medium mt-2">Bạn có thể thay đổi giá này bất cứ lúc nào.</h3>
  //       </header>
  //       <div>
  //         <label htmlFor="" className="text-lg font-medium text-gray-700">
  //           Giá ($)
  //           <input
  //             type="number"
  //             {...register('price')}
  //             min={1}
  //             className="border border-gray-400 rounded-lg w-full p-6 text-xl"
  //           />
  //         </label>
  //       </div>
  //     </div>
  //   );
  // }

  useEffect(() => { }, [step]);

  const fetchHouseType = async () => {
    const res = await getAllHouseType();
    setHouseTypeList(res.data.data);
    console.log(houseTypeList);
    return;
  };

  const fetchConvenients = async () => {
    const res = await getAllConvenient();
    setConvenients(res.data.data);
    return;
  };

  const onSubmit = async data => {
    console.log('Form: ', data);
    data.provinceCode = data.provinceCode.code;
    data.districtCode = data.districtCode.code;
    try {
      await createHouse(data).then(res => {
        toast.success('Add new house successfully! ');
        navigate('/hosting/listing')
        navigator
      });
    } catch (err) {
      toast.error('Add new house failed! ');
    }
  };

  return (
    <div>
      {/* HEADER */}
      <Container className="fixed top-0 w-full bg-white">
        <header className="py-4 flex justify-between">
          <Link
            to="/hosting"
            className="flex items-center relative z-[101] h-12"
          >
            <img src="/src/assets/app-icon.svg" className="h-8"></img>
          </Link>
        </header>
      </Container>

      {/* Main Content */}
      <Container className="my-[80px] pb-10">
        <div className="w-full flex flex-col items-center">{bodyContent}</div>
      </Container>

      {/* Footer Action */}
      <Container className="fixed border-t-[1px] bottom-0 w-full bg-white">
        <div className="py-4 flex justify-between">
          <button
            disabled={step === STEP.HOUSE_TYPE}
            className={`underline font-semibold ${step === STEP.HOUSE_TYPE && 'text-neutral-400'
              }`}
            onClick={onBack}
          >
            Quay lại
          </button>
          <div className="max-w-[200px]">
            {step === STEP.PRICE ? (
              <Button
                label="Tạo căn hộ"
                disabled={isDisableSubmit}
                onClick={handleSubmit(onSubmit)}
              />
            ) : (
              <Button
                label="Tiếp theo"
                disabled={isDisableNext}
                onClick={onNext}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HostingAdding;
