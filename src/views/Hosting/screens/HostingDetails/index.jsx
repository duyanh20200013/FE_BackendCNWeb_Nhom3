import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import Navbar from '@/views/Hosting/components/Navbar';
import Container from '@/components/Container';
import EditBox from './components/EditBox2';
import SideNav from './components/SideNav';
import EditImageModal from './components/EditImageModal';
import AppInput from '@/components/inputs/AppInput';
import AppSelect from '@/components/inputs/AppSelect';
import AppCounterLabel from '@/components/inputs/AppCounterLabel';
import AppCheckbox from '@/components/inputs/AppCheckbox';
import Modal from '@/components/modal/Modal';
import {
  getHouseById,
  getAllConvenient,
  getAllProvince,
  getAllDistrictOfProvince,
} from '@/api/houseApi';
import { updateHouse } from '@/api/ownerApi';
import Global from '@/general/Global';
// import { getAllHouseType, , getAllProvince, getAllDistrictOfProvince } from '@/api/houseApi';

const houseKindList = Global.houseKindList;

const convenientTypeObj = {
  ESSENTIAL: 'Đồ dùng thiết yếu',
  ATTRIBUTE: 'Đặc điểm',
  LOCATION: 'Vị trí',
  SECURE: 'An toàn',
};

function HostingEditing() {
  useEffect(() => {
    console.log('re-render hosting edit');
  });

  // Show edit states
  const [isEditName, setIsEditName] = useState(false);
  const [isEditConvenient, setIsEditConvenient] = useState(false);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [isEditRoom, setIsEditRoom] = useState(false);
  const [convenients, setConvenients] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [isImageModal, setIsImageModal] = useState(false);

  const { id } = useParams();

  const { register, reset, handleSubmit, setValue, watch, control } = useForm();
  //   {
  //   defaultValues: async () => fetchHouse(id),
  // }

  const getAsyncFormDefaultValues = useCallback(async () => {
    const { data, dataConvenient, dataType } = await fetchHouse(id);

    const formData = {
      provinceCode: data?.provinceData?.code,
      districtCode: data?.districtData?.code,
      name: data?.name,
      title: data?.title,
      House_Info: { ...data.House_Info },
      House_Image: data?.houseImageIdData || [],
      House_Type: dataType?.map(item => item.id) || [],
      House_Convenient: dataConvenient?.map(item => item.id) || [],
      price: data?.price,
    };

    console.log('Default Form: ', formData);

    reset(formData);

    if (formData.provinceCode) {
      fetchDistrictList(formData.provinceCode);
    }
  }, [reset, id]);

  // Get Form's defaultValues
  useEffect(() => {
    getAsyncFormDefaultValues();
  }, [getAsyncFormDefaultValues]);

  const formData = watch();
  console.log('Form: ', formData);

  // const {
  //   // kindOfHouse,
  //   // maxGuests,
  //   // countBedRoom,
  //   // countBed,
  //   // countBathRoom,
  //   // descriptionHTML,
  //   address,
  //   addressDescription,
  // } = watch('House_Info');
  const houseName = watch('name');
  const houseTitle = watch('title');
  const maxGuests = watch('House_Info.maxGuests');
  const House_Info = watch('House_Info');
  const House_Image = watch('House_Image') || [];
  const houseConvenients = watch('House_Convenient');
  const provinceCode = watch('provinceCode');
  const districtCode = watch('districtCode');
  console.log('houseConvenients: ', houseConvenients);

  const {
    replace: replaceHouseConvenients,
    remove: removeConvenient,
    append: addConvenient,
  } = useFieldArray({
    name: 'dataConvenient',
    control,
  });

  useEffect(() => {
    fetchConvenients();
    fetchProvinceList();
  }, []);

  // useEffect(() => {
  //   fetchHouse(id);
  //   return;
  // }, [id]);

  const fetchHouse = async id => {
    const res = await getHouseById({ id });
    // setHouseData(res?.data?.data);
    console.log(res.data);
    return res?.data;
  };

  const fetchConvenients = async () => {
    const res = await getAllConvenient();
    setConvenients(res.data.data);
    return;
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

  const setConvenientData = e => {
    const { value, checked } = e.target;
    console.log(houseConvenients, value * 1);
    if (checked) {
      // replaceHouseConvenients('dataConvenient', [1, 2, 3]);
      // addConvenient(value * 1);
      setValue('House_Convenient', [...houseConvenients, value * 1]);
    } else {
      // replaceHouseConvenients([
      //   ...houseConvenients.filter(item => item !== value * 1),
      // ]);
      setValue('House_Convenient', [
        ...houseConvenients.filter(item => item !== value * 1),
      ]);
    }
  };

  const fnSetProvince = selected => {
    console.log(selected);
    if (selected) {
      setValue('provinceCode', selected);
      setValue('districtCode', null);
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

  const onSubmit = async data => {
    console.log('Data: ', data);
    data.provinceCode = data.provinceCode?.code || data.provinceCode;
    data.districtCode = data.districtCode?.code || data.districtCode;
    data.House_Info.kindOfHouse =
      data.House_Info.kindOfHouse.label || data.House_Info.kindOfHouse;
    console.log('Submit: ', data);
    await updateHouse({ houseId: id }, data)
      .then(res => {
        console.log(res);
        toast.success('Chỉnh sửa căn hộ thành công!');
      })
      .catch(err => {
        toast.error('Chỉnh sửa căn hộ thất bại!');
      });
    // try {
    //   if (res) {
    //     console.log(res);
    //     toast.success('Chỉnh sửa căn hộ thành công!');
    //   }
    // } catch {
    //   toast.error('Chỉnh sửa căn hộ thất bại!');
    // }
  };

  return (
    <div>
      <Navbar />

      <Container>
        {/* Header */}
        <div className="flex flex-wrap">
          <div className="w-full mt-10 mb-5">abcd</div>

          {/* Side nav */}
          <SideNav />

          {/* Detail */}
          <div className="flex-1">
            <div id="house_image" className="pb-8 border-b-[1px] mb-8">
              <EditImageModal
                imageList={[...House_Image]}
                open={isImageModal}
                onClose={() => setIsImageModal(false)}
                onChangeImage={val => setValue('House_Image', val)}
                onSubmit={handleSubmit(onSubmit)}
              />
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[18px] mb-8">Ảnh</h3>
                <div
                  className="font-semibold underline cursor-pointer"
                  onClick={() => setIsImageModal(true)}
                >
                  Chỉnh sửa
                </div>
              </div>
              <div className="flex gap-2 overflow-auto">
                {House_Image?.map(item => {
                  return (
                    <img
                      className="w-[210px] h-[140px] object-cover"
                      src={item.url}
                    />
                  );
                })}
              </div>
            </div>
            <div id="house_info" className="">
              <h3 className="font-bold text-[18px] mb-8">
                Thông tin cơ bản về nhà/phòng cho thuê
              </h3>
              <EditBox
                onSubmit={handleSubmit(onSubmit)}
                titleElement={
                  <div>
                    <p className="w-full">Tên nhà/phòng cho thuê</p>
                    <p className="text-sm text-gray-400">{houseName}</p>
                  </div>
                }
                editElement={
                  <>
                    <h3 className="font-semibold">Tên nhà/phòng cho thuê</h3>
                    <span className="font-normal text-gray-400 text-sm">
                      Tên nhà/phòng cho thuê của bạn cần nêu bật được những điểm
                      đặc biệt của chỗ ở.
                    </span>
                    <div className="my-4">
                      <AppInput
                        id="name"
                        register={register}
                        className="border-[1px]"
                      />
                    </div>
                  </>
                }
              />
              <EditBox
                onSubmit={handleSubmit(onSubmit)}
                titleElement={
                  <div>
                    <p className="w-full">Tiêu đề nhà/phòng cho thuê</p>
                    <p className="text-sm text-gray-400">{houseTitle}</p>
                  </div>
                }
                editElement={
                  <>
                    <h3 className="font-semibold">Tiêu đề/phòng cho thuê</h3>
                    <span className="font-normal text-gray-400 text-sm">
                      Tên nhà/phòng cho thuê của bạn cần nêu bật được những điểm
                      đặc biệt của chỗ ở.
                    </span>
                    <div className="my-4">
                      <AppInput
                        id="title"
                        register={register}
                        className="border-[1px]"
                      />
                    </div>
                  </>
                }
              />
              <EditBox
                onSubmit={handleSubmit(onSubmit)}
                titleElement={
                  <div>
                    <p className="w-full">Số lượng khách</p>
                    <p className="text-sm text-gray-400">{maxGuests}</p>
                  </div>
                }
                editElement={
                  <AppCounterLabel
                    value={maxGuests}
                    disableDecrease={maxGuests == 1}
                    onIncrease={() => {
                      setValue('House_Info.maxGuests', maxGuests + 1);
                    }}
                    onDecrease={() => {
                      setValue('House_Info.maxGuests', maxGuests - 1);
                    }}
                    label="Số lượng khách"
                  />
                }
              />
            </div>
            <div id="house_convenient">
              <h3 className="font-bold text-[18px] mb-8">Tiện nghi</h3>
              <EditBox
                onSubmit={handleSubmit(onSubmit)}
                editElement={
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
                              checked={houseConvenients?.includes(item.id)}
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
                              checked={houseConvenients?.includes(item.id)}
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
                              checked={houseConvenients?.includes(item.id)}
                            />
                          </div>
                        );
                      }
                    })}

                    {/* Secure Convenient */}
                    <div className="col-span-2 mt-6 mb-1">
                      <h3 className="font-semibold text-lg">
                        Bạn có tiện nghi nào trong số những tiện nghi đảm bảo an
                        toàn sau đây không?
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
                              checked={houseConvenients?.includes(item.id)}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                }
              />
            </div>
            <div id="house_location">
              <h3 className="font-bold text-[18px] mb-8">Vị trí</h3>
              <EditBox
                onSubmit={handleSubmit(onSubmit)}
                editElement={
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="text-base font-medium">
                        Tỉnh/Thành phố
                      </label>
                      <AppSelect
                        options={provinceList}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.code}
                        itemValue="code"
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
                        itemValue="code"
                        value={districtCode}
                        onChange={fnSetDistrict}
                      />
                    </div>
                    <AppInput
                      label="Dòng địa chỉ 1"
                      value={House_Info?.address}
                      onChange={e => {
                        setValue('House_Info.address', e.target.value);
                      }}
                    />
                    <AppInput
                      label="Dòng địa chỉ 2"
                      value={House_Info?.addressDescription}
                      onChange={e => {
                        setValue(
                          'House_Info.addressDescription',
                          e.target.value,
                        );
                      }}
                    />
                  </div>
                }
              />
            </div>
            <div id="house_type">
              <h3 className="font-bold text-[18px] mb-8">Chỗ ở và phòng</h3>
              <EditBox
                onSubmit={handleSubmit(onSubmit)}
                titleElement={
                  <div>
                    <p className="w-full">Loại chỗ ở</p>
                    <p className="text-sm text-gray-400">
                      {House_Info?.kindOfHouse}
                    </p>
                  </div>
                }
                editElement={
                  <>
                    <h3 className="font-semibold">Loại chỗ ở</h3>
                    <span className="font-normal text-gray-400 text-sm">
                      Chọn một loại chỗ ở phù hợp nhất với nhà/phòng cho thuê
                      của bạn để đặt ra kỳ vọng cho khách và giúp nhà/phòng cho
                      thuê của bạn xuất hiện phù hợp với tiêu chí tìm kiếm.
                    </span>
                    <div className="my-4">
                      <AppSelect
                        options={houseKindList}
                        getOptionLabel={option => option.label}
                        getOptionValue={option => option.label}
                        value={House_Info?.kindOfHouse}
                        itemValue="label"
                        onChange={selected =>
                          setValue('House_Info.kindOfHouse', selected)
                        }
                      />
                    </div>
                  </>
                }
              />
              <EditBox
                onSubmit={handleSubmit(onSubmit)}
                titleElement={
                  <div>
                    <p className="w-full">Phòng và không gian khác</p>
                    <p className="text-sm text-gray-400">
                      Phòng ngủ: {House_Info?.countBed || 0}
                    </p>
                    <p className="text-sm text-gray-400">
                      Giường: {House_Info?.countBedRoom || 0}
                    </p>
                    <p className="text-sm text-gray-400">
                      Phòng tắm: {House_Info?.countBathRoom || 0}
                    </p>
                  </div>
                }
                editElement={
                  <>
                    <h3 className="font-semibold">Phòng và không gian khác</h3>
                    <span className="font-normal text-gray-400 text-sm">
                      Chỉnh sửa phòng và không gian của bạn, cho khách biết họ
                      nên mong đợi những gì.
                    </span>
                    <div className="flex flex-col">
                      <AppCounterLabel
                        value={House_Info?.countBedRoom}
                        disableDecrease={House_Info?.countBedRoom == 0}
                        onIncrease={() => {
                          setValue(
                            'House_Info.countBedRoom',
                            House_Info?.countBedRoom + 1,
                          );
                        }}
                        onDecrease={() => {
                          setValue(
                            'House_Info.countBedRoom',
                            House_Info?.countBedRoom - 1,
                          );
                        }}
                        label="Phòng ngủ"
                        borderBottom
                      />
                      <AppCounterLabel
                        value={House_Info?.countBed}
                        disableDecrease={House_Info?.countBed == 1}
                        onIncrease={() => {
                          setValue(
                            'House_Info.countBed',
                            House_Info?.countBed + 1,
                          );
                        }}
                        onDecrease={() => {
                          setValue(
                            'House_Info.countBed',
                            House_Info?.countBed - 1,
                          );
                        }}
                        label="Giường"
                        borderBottom
                      />
                      <AppCounterLabel
                        value={House_Info?.countBathRoom}
                        disableDecrease={House_Info?.countBathRoom == 1}
                        onIncrease={() => {
                          setValue(
                            'House_Info.countBathRoom',
                            House_Info?.countBathRoom + 1,
                          );
                        }}
                        onDecrease={() => {
                          setValue(
                            'House_Info.countBathRoom',
                            House_Info?.countBathRoom - 1,
                          );
                        }}
                        label="Phòng tắm"
                      />
                    </div>
                  </>
                }
              />
            </div>
            {/* <div id="house_type" className="pb-8 border-b-[1px] mb-8">
              <h3 className="font-bold text-[18px] mb-8">An toàn cho khách</h3>
            </div> */}
          </div>

          {/* Modal */}
        </div>
      </Container>
    </div>
  );
}

export default HostingEditing;
