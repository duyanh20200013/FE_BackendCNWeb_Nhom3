import { useEffect, useState, useRef } from 'react';
// import { addDays } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';
// import { IoIosArrowDown } from 'react-icons/io';
// import { useDispatch, useSelector } from 'react-redux';
// import reservationSlice from '../../../store/reducers/reservationSlice';
// import DatePicker from '@/components/DatePicker';
// import Button from '@/components/Button';
// import SearchOptionWrapper from '@/components/navbar/SearchOptionWrapper';
// import GuestSearchWrapper from '@/components/navbar/GuestSearchWrapper';
// import AppCounter from '@/components/AppCounter';
// import useOutsideClick from '@/hooks/useOutsideClick';

function PriceDetail({ houseData, days }) {

    const [price, setPrice] = useState({
        day: 1,
        totalPrice: 16
    })

    useEffect(() => {
        setPrice({ day: days, totalPrice: houseData.price * days })
    }, [houseData.House_Info.maxGuests]);

    return (
        <div className="sticky top-20">
            <div className="card w-full bg-base-100 shadow-xl card-bordered border-neutral-200 mt-12">
                <div className="card-body">
                    <div className="flex flex-col">
                        <div className="flex justify-between border-b-[1px] pb-6">
                            <img src={houseData.houseImageIdData[1].url} alt="" className="aspect-[6/5] object-cover w-1/3 h-1/3" />
                            <div className="w-[60%] flex flex-col ">
                                <div>
                                    <span className="font-sm text-neutral-400">{houseData.name}</span>
                                    <br />
                                    <span className="text-sm">{houseData.title}</span>
                                </div>
                                <div className='flex mr-2 items-center mt-2'>
                                    <AiFillStar />
                                    <span className="pl-[2px] font-medium">
                                        {houseData.star || "Mới"}
                                        <span className="px-1">&middot;</span>
                                    </span>
                                    <span className="underline font-medium text-neutral-400">{houseData.countReview} đánh giá</span>
                                </div>
                            </div>
                        </div>
                        <div className='pb-6 mt-4 border-b-[1px]'>
                            <h1 className='text-2xl font-semibold'>Chi tiết giá</h1>
                            <div className='flex justify-between text-lg mt-2'>
                                <span className='underline'>${houseData.price} x {price.day} đêm</span>
                                <span>${price.totalPrice}</span>
                            </div>
                            <div className='flex justify-between text-lg mt-2'>
                                <span className='underline'>Phí dịch vụ</span>
                                <span>${parseInt(price.totalPrice / 10)}</span>
                            </div>
                        </div>
                        <div className='flex justify-between text-lg mt-2 pb-6'>
                            <span className="text-xl font-semibold" >Tổng</span>
                            <span className="text-xl font-semibold">${price.totalPrice + parseInt(price.totalPrice / 10)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PriceDetail;