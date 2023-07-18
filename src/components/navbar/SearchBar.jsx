import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import qs from 'qs';
import searchSlice from '../../store/reducers/searchSlice';
import SearchOptionButton from './SearchOptionsButton';
import SearchOptionWrapper from './SearchOptionWrapper';
import DatePicker from '../DatePicker';
import GuestSearchWrapper from './GuestSearchWrapper';
import AppCounter from '../AppCounter';
import { FaSearch } from 'react-icons/fa';
import LocationSearch from './LocationSearch';

const SEARCH_MENU = {
  LOCATION: 'location',
  CHECK_IN: 'checkIn',
  CHECK_OUT: 'checkOut',
  GUESTS: 'guests',
};

const dateRangeStyle = 'left-0 searchbar:w-[850px] w-full';

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchData = useSelector(state => state.search.data);
  const isSearch = useSelector(state => state.search.isSearch);

  const [queryParams, setQueryParams] = useState(qs.parse(location.search, { ignoreQueryPrefix: true }));
  const [searchMenu, setSearchMenu] = useState(null);
  // State for SearchOptionButton's Text
  const [locationText, setLocationText] = useState('');
  const [startDateText, setStartDateText] = useState('');
  const [endDateText, setEndDateText] = useState('');
  const [dateData, setDateData] = useState({
    startDate: new Date(),
    endDate: null,
  });

  const setIsSearch = value => {
    dispatch(searchSlice.actions.setIsSearch(value));
  };

  const fnChangeDate = value => {
    setDateData({ startDate: value.startDate, endDate: value.endDate });
    const startDate = format(value.startDate, 'yyyy-MM-dd');
    const endDate = format(value.endDate, 'yyyy-MM-dd');
    dispatch(searchSlice.actions.setCheckInDate(startDate));
    dispatch(searchSlice.actions.setCheckOutDate(endDate));
    setStartDateText(startDate);
    setEndDateText(endDate);
    console.log('Date', startDate, endDate);
  };

  const fnSearch = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Location: ', queryParams);

    let paramObj = {
      provinceCode: searchData.provinceCode,
      districtCode: searchData.districtCode,
      time: {
        arriveDate: searchData.checkIn,
        leftDate: searchData.checkOut,
      },
      guest: searchData.guests.adults + searchData.guests.children + searchData.guests.infants,
    };

    setQueryParams({ ...queryParams, ...paramObj });
    console.log('Submit form with params: ', queryParams);

    handleLink(qs.stringify(queryParams));
  };

  const handleLink = queryParamsStr => {
    navigate({
      pathname: '/',
      search: `?${queryParamsStr}`,
    });
  };

  useEffect(() => {
    const tmp = searchData.provinceName
      ? searchData.districtName
        ? `${searchData.districtName}, ${searchData.provinceName}`
        : searchData.provinceName
      : '';

    setLocationText(tmp);
  }, [searchData.provinceName, searchData.districtName]);

  return (
    <div>
      <div
        className={`flex items-center border text-center border-gray-300 rounded-full h-[54px] shadow hover:shadow-md cursor-pointer duration-300 ${isSearch ? 'invisible translate-y-[-50%] scale-50 opacity-0' : 'visible'
          }`}
        onClick={() => setIsSearch(true)}
      >
        <div className="px-4" onClick={() => setSearchMenu(SEARCH_MENU.LOCATION)}>
          Địa điểm bất kỳ
        </div>
        <div className="h-6 border-l border-gray-300"></div>
        <div className="px-4" onClick={() => setSearchMenu(SEARCH_MENU.CHECK_IN)}>
          Tuần bất kỳ
        </div>
        <div className="h-6 border-l border-gray-300"></div>
        <div className="pl-4 pr-3" onClick={() => setSearchMenu(SEARCH_MENU.GUESTS)}>
          Thêm khách
        </div>
        <div className="pr-2">
          <button className="bg-primary text-white p-[10px] rounded-full">
            <FaSearch size={12} />
          </button>
        </div>
      </div>

      <div className={`${isSearch ? 'visibile' : 'invisible'}`} onClick={() => setSearchMenu(null)}>
        <div tabIndex={0} className={`absolute bg-white sm:px-5 md:px-10 top-0 left-0 w-full search-bar z-[100]`}>
          {/* Search Bar */}
          <div className="h-10 block lg:hidden"></div>
          <div className={`duration-300 ${!isSearch && 'translate-y-[-50%] scale-50 opacity-0'}`}>
            <div className="relative z-10">
              <div className="flex justify-center items-center mx-auto lg:mx-40 h-20">
                <div>
                  <div className="inline-block">
                    <button className="px-4 py-[10px] mr-2 hover:opacity-60">Chỗ ở</button>
                  </div>
                  <div className="inline-block">
                    <button className="px-4 py-[10px] mr-2 hover:opacity-60">Trải nghiệm</button>
                  </div>
                </div>
                <div>
                  <a href="#" className="px-4 py-[10px] hover:opacity-60">
                    Trải nghiệm trực tuyến
                  </a>
                </div>
              </div>
            </div>
            {/* Search Form */}
            <div className="pb-4 relative z-10">
              <div>
                <form action="" className="max-w-[850px] m-auto" onSubmit={fnSearch}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => e.stopPropagation()}
                    className="bg-[#EBEBEB] rounded-full grid grid-cols-[1fr_0.5fr_0.5fr_1fr] lg:grid-cols-[1fr_0.5fr_0.5fr_1fr] border-[1px] border-gray-300 relative"
                  >
                    <SearchOptionButton
                      label="Địa điểm"
                      placeholder="Tìm kiếm điểm đến"
                      type="inputText"
                      value={locationText}
                      onFocus={() => setSearchMenu(SEARCH_MENU.LOCATION)}
                      active={searchMenu === SEARCH_MENU.LOCATION}
                    >
                      <SearchOptionWrapper className="left-0">
                        <LocationSearch />
                      </SearchOptionWrapper>
                    </SearchOptionButton>
                    <SearchOptionButton
                      label="Nhận phòng"
                      placeholder="Thêm ngày"
                      type="inputText"
                      value={startDateText}
                      onFocus={() => setSearchMenu(SEARCH_MENU.CHECK_IN)}
                      active={searchMenu === SEARCH_MENU.CHECK_IN}
                    >
                      <SearchOptionWrapper className={dateRangeStyle}>
                        <DatePicker
                          startDate={dateData.startDate}
                          endDate={dateData.endDate}
                          onChange={fnChangeDate}
                        ></DatePicker>
                      </SearchOptionWrapper>
                    </SearchOptionButton>
                    <SearchOptionButton
                      label="Trả phòng"
                      placeholder="Thêm ngày"
                      type="inputText"
                      value={endDateText}
                      onFocus={() => setSearchMenu(SEARCH_MENU.CHECK_OUT)}
                      active={searchMenu === SEARCH_MENU.CHECK_OUT}
                    >
                      <SearchOptionWrapper className={dateRangeStyle}>
                        <DatePicker
                          startDate={dateData.startDate}
                          endDate={dateData.endDate}
                          onChange={fnChangeDate}
                        ></DatePicker>
                      </SearchOptionWrapper>
                    </SearchOptionButton>
                    <SearchOptionButton
                      label="Khách"
                      placeholder="Thêm khách"
                      onFocus={() => setSearchMenu(SEARCH_MENU.GUESTS)}
                      active={searchMenu === SEARCH_MENU.GUESTS}
                      withSearch
                      isSearch={!!searchMenu}
                    >
                      <SearchOptionWrapper className="right-0 w-96">
                        <GuestSearchWrapper label="Người lớn" description="Từ 13 tuổi trở lên" borderBottom>
                          <AppCounter
                            value={searchData.guests.adults}
                            onIncrease={() => dispatch(searchSlice.actions.increaseAdults())}
                            onDecrease={() => dispatch(searchSlice.actions.decreaseAdults())}
                            maxValue={16}
                          ></AppCounter>
                        </GuestSearchWrapper>
                        <GuestSearchWrapper label="Trẻ em" description="Độ tuổi 2 - 12" borderBottom>
                          <AppCounter
                            value={searchData.guests.children}
                            onIncrease={() => dispatch(searchSlice.actions.increaseChildren())}
                            onDecrease={() => dispatch(searchSlice.actions.decreaseChildren())}
                            maxValue={16}
                          ></AppCounter>
                        </GuestSearchWrapper>
                        <GuestSearchWrapper label="Em bé" description="Dưới 2 tuổi" borderBottom>
                          <AppCounter
                            value={searchData.guests.infants}
                            onIncrease={() => dispatch(searchSlice.actions.increaseInfants())}
                            onDecrease={() => dispatch(searchSlice.actions.decreaseInfants())}
                            maxValue={5}
                          ></AppCounter>
                        </GuestSearchWrapper>
                        <GuestSearchWrapper label="Thú cưng" description="">
                          <AppCounter
                            value={searchData.guests.pets}
                            onIncrease={() => dispatch(searchSlice.actions.increasePets())}
                            onDecrease={() => dispatch(searchSlice.actions.decreasePets())}
                            maxValue={1}
                          ></AppCounter>
                        </GuestSearchWrapper>
                      </SearchOptionWrapper>
                    </SearchOptionButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* BG LAYER */}
        {/* <div
          className="absolute bg-[rgba(0,0,0,0.25)] left-0 top-0 h-screen w-screen z-[99]"
          onClick={() => setIsSearch(false)}
        ></div> */}
      </div>
      {/* )} */}
    </div>
  );
}

export default Search;
