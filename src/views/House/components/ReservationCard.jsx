import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import reservationSlice from '../../../store/reducers/reservationSlice';
import { format } from 'date-fns';
import DatePicker from '@/components/DatePicker';
import Button from '@/components/Button';
import SearchOptionWrapper from '@/components/navbar/SearchOptionWrapper';
import GuestSearchWrapper from '@/components/navbar/GuestSearchWrapper';
import AppCounter from '@/components/AppCounter';
import useOutsideClick from '@/hooks/useOutsideClick';
import qs from 'qs';

function ReservationCard({ houseData, contractData, fnShowLogin }) {
  const dispatch = useDispatch();
  const reservationData1 = useSelector(state => state.reservation);
  const authData = useSelector(state => state.auth);

  const handleLink = () => {
    if (authData.isLogin && (price.day > 0) && (reservationData1.data.guests.adults + reservationData1.data.guests.children) > 0) {
      window.open(`/contract/${houseData.id}?arriveDate=${format(dateData.arriveDate, 'yyyy-MM-dd')}&leftDate=${format(dateData.leftDate, 'yyyy-MM-dd')}&adults=${reservationData1.data.guests.adults}&children=${reservationData1.data.guests.children}&infants=${reservationData1.data.guests.infants}&pets=${reservationData1.data.guests.pets}&price=${price.totalPrice + parseInt(price.totalPrice / 10)}`, '_blank');
    }
    if (!authData.isLogin) {
      fnShowLogin();
    }
  };

  const [dateData, setDateData] = useState({
    arriveDate: new Date(),
    leftDate: addDays(new Date(), 1),
  })

  const [reservationData, setReservationData] = useState({
    houseId: null,
    arriveDate: new Date(),
    leftDate: addDays(new Date(), 1),
    price: null,
    numberOver13: null,
    numberUnder13: null,
    haveAnimals: false,
  });

  const fnChangeDate = value => {
    var Difference_In_Day = (value.endDate.getTime() - value.startDate.getTime()) / (1000 * 3600 * 24);

    setDateData({ arriveDate: value.startDate, leftDate: value.endDate });
    setPrice({ day: Difference_In_Day, totalPrice: Difference_In_Day * houseData.price })

  };

  const [showGuestInputs, setShowGuestInputs] = useState(false);

  const guestInputsRef = useOutsideClick(() => setShowGuestInputs(false));

  var getDisabledDate = function (ContractArr) {
    let disabledDate = [];
    for (let i = 0; i < ContractArr.length; i++) {
      getDaysArray(ContractArr[i].arriveDate, ContractArr[i].leftDate, disabledDate);
    }

    return disabledDate;
  };

  var getDaysArray = function (start, end, arr) {
    for (var dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
  };

  const [price, setPrice] = useState({
    day: 1,
    totalPrice: houseData.price
  })

  useEffect(() => {
    setPrice({ day: 1, totalPrice: houseData.price })
    let isPet = 0;
    if (houseData.House_Info.allowAnimals) {
      isPet = 1;
    }
    dispatch(reservationSlice.actions.setMaxGuests(houseData.House_Info.maxGuests))
    dispatch(reservationSlice.actions.setIsPet(isPet))
  }, [houseData.House_Info.maxGuests]);

  return (
    <div className="sticky top-20">
      <div className="card w-full bg-base-100 shadow-xl card-bordered border-neutral-200 mt-12">
        <div className="card-body">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div>
                <span className="text-xl font-semibold">${houseData.price}</span> / đêm{' '}
              </div>
              <div>
                <div className="flex mr-2 items-center">
                  <AiFillStar />
                  <span className="pl-[2px] font-medium">
                    {houseData.star || "Mới"}
                    <span className="px-1">&middot;</span>
                  </span>
                  <span className="underline font-medium text-neutral-400">{houseData.countReview} đánh giá</span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="border rounded-t-lg overflow-hidden px-2">
                <DatePicker
                  startDate={dateData.arriveDate}
                  endDate={dateData.leftDate}
                  monthColumn={1}
                  disabledDates={getDisabledDate(contractData)}
                  onChange={fnChangeDate}
                // showDateDisplay={true}
                />
              </div>

              {/* Guest Input Popover */}
              <div
                className="px-3 pb-3 pt-2 rounded-b-lg border cursor-pointer flex items-center relative"
                onClick={() => setShowGuestInputs(true)}
              >
                <div className="flex flex-col flex-1 ">
                  <span className="font-medium text-xs">Khách</span>
                  <span className="text-sm">{reservationData1.data.guests.adults} Người lớn, {reservationData1.data.guests.children} trẻ em, {reservationData1.data.guests.infants} em bé và {reservationData1.data.guests.pets ? 'có' : 'không'} mang thú cưng</span>
                </div>
                <IoIosArrowDown size={20} />

                {/* Guest Input Wrapper */}
                <SearchOptionWrapper
                  ref={guestInputsRef}
                  className={`z-10 bottom-[100%] w-full left-0 border ${showGuestInputs ? 'block' : 'hidden'}`}
                >
                  <GuestSearchWrapper label="Người lớn" description="Từ 13 tuổi trở lên" borderBottom>
                    <AppCounter
                      value={reservationData1.data.guests.adults}
                      onIncrease={() => dispatch(reservationSlice.actions.increaseAdults())}
                      onDecrease={() => dispatch(reservationSlice.actions.decreaseAdults())}
                      maxValue={reservationData1.data.maxGuests - reservationData1.data.guests.children}
                    ></AppCounter>
                  </GuestSearchWrapper>
                  <GuestSearchWrapper label="Trẻ em" description="Độ tuổi 2 - 12" borderBottom>
                    <AppCounter
                      value={reservationData1.data.guests.children}
                      onIncrease={() => dispatch(reservationSlice.actions.increaseChildren())}
                      onDecrease={() => dispatch(reservationSlice.actions.decreaseChildren())}
                      maxValue={reservationData1.data.maxGuests - reservationData1.data.guests.adults}
                    ></AppCounter>
                  </GuestSearchWrapper>
                  <GuestSearchWrapper label="Em bé" description="Dưới 2 tuổi" borderBottom>
                    <AppCounter
                      value={reservationData1.data.guests.infants}
                      onIncrease={() => dispatch(reservationSlice.actions.increaseInfants())}
                      onDecrease={() => dispatch(reservationSlice.actions.decreaseInfants())}
                      maxValue={5}
                    ></AppCounter>
                  </GuestSearchWrapper>
                  <GuestSearchWrapper label="Thú cưng" description="">
                    <AppCounter
                      value={reservationData1.data.guests.pets}
                      onIncrease={() => dispatch(reservationSlice.actions.increasePets())}
                      onDecrease={() => dispatch(reservationSlice.actions.decreasePets())}
                      maxValue={reservationData1.data.isPet}
                    ></AppCounter>
                  </GuestSearchWrapper>
                  <div>Nơi này cho phép tối đa {reservationData1.data.maxGuests} khách và {reservationData1.data.isPet ? "có" : "không"} cho phép mang thú cưng</div>
                </SearchOptionWrapper>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end mt-2">
            <Button onClick={handleLink} label="Đặt phòng"></Button>
          </div>
          <span className='text-sm text-center py-4'>Bạn vẫn chưa bị trừ tiền</span>
          <div className='flex justify-between text-lg mt-2'>
            <span className='underline'>${houseData.price} x {price.day} đêm</span>
            <span>${price.totalPrice}</span>
          </div>
          <div className='flex justify-between text-lg mt-2 pb-6 border-b-[1px]'>
            <span className='underline'>Phí dịch vụ</span>
            <span>${parseInt(price.totalPrice / 10)}</span>
          </div>
          <div className='flex justify-between text-lg mt-2 pb-6'>
            <span className="text-xl font-semibold" >Tổng</span>
            <span className="text-xl font-semibold">${price.totalPrice + parseInt(price.totalPrice / 10)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
