import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Button from '../../../components/Button';
import { IoMdClose } from 'react-icons/io';

import { refundContract, cancelContract } from '@/api/houseApi';



function CancelCard({ onClose, data2 }) {
    const navigate = useNavigate();


    const [cancel, setCancel] = useState('');

    const handleInput = function (e) {
        setCancel(e.target.value)
    }

    const data = {
        contractId: data2.contractId,
        cancelReason: cancel
    }

    const handleSubmit = async () => {
        try {
            if (data2.refund) {
                await refundContract(data);
            } else {
                await cancelContract(data);
            }
            navigate(0);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="card sm:w-[600px] max-w-full bg-base-100 shadow-xl">
            <h2 className="relative card-title justify-center py-5 border-b-[1px]">
                {onClose && <IoMdClose className="absolute left-8 cursor-pointer" size={24} onClick={onClose} />}
                Huỷ hợp đồng
            </h2>
            <div className="card-body">
                <div className='mt-2 pb-6'>
                    <input
                        type="text"
                        placeholder='Mời bạn nhập lý do huỷ chuyến đi'
                        className='input input-bordered w-full  border-1 focus:border-2 focus:outline-0'
                        onChange={handleInput}
                    />
                </div>
                <div className='flex mt-2 pb-6 mr-2 items-center'>
                    <span className='text-sm'>Bằng việc chọn nút bên dưới, tôi đồng ý với <span className='underline font-semibold'>Chính sách đặt lại và hoàn tiền của Airbnb</span> và đồng ý huỷ chuyến đi </span>
                </div>
                <Button label="Huỷ hợp đồng" onClick={handleSubmit} />
            </div>
        </div>
    );
}

export default CancelCard;