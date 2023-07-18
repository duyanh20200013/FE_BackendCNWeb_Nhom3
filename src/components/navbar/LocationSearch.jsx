import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProvince, getAllDistrictOfProvince } from '@/api/houseApi';
import searchSlice from '@/store/reducers/searchSlice';
import AppSelect from '@/components/inputs/AppSelect';

function LocationSearch() {
  const dispatch = useDispatch();

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  useEffect(() => {
    fetchProvinceList();
  }, []);

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
    if (selected) {
      console.log('Province', selected);
      fetchDistrictList(selected?.code);
      dispatch(searchSlice.actions.setProvinceCode(selected?.code));
      dispatch(searchSlice.actions.setProvinceName(selected?.name));
      dispatch(searchSlice.actions.setDistrictCode(null));
      dispatch(searchSlice.actions.setDistrictName(null));
    } else {
      setDistrictList([]);
      dispatch(searchSlice.actions.setProvinceCode(null));
      dispatch(searchSlice.actions.setProvinceName(null));
      dispatch(searchSlice.actions.setDistrictCode(null));
      dispatch(searchSlice.actions.setDistrictName(null));
    }
  };

  // Set Search data's districtCode
  const fnSetDistrict = selected => {
    console.log('District', selected);
    dispatch(searchSlice.actions.setDistrictCode(selected?.code || null));
    dispatch(searchSlice.actions.setDistrictName(selected?.name || null));
  };

  return (
    <div className="sm:w-[320px] flex flex-col gap-6 py-6">
      <div>
        <label className="text-base font-medium">Tỉnh/Thành phố</label>
        <AppSelect
          options={provinceList}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.code}
          onChange={fnSetProvince}
        />
      </div>
      <div>
        <label className="text-base font-medium">Thành phố/Quận/Huyện</label>
        <AppSelect
          options={districtList}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.code}
          onChange={fnSetDistrict}
        />
      </div>
    </div>
  );
}

export default LocationSearch;
