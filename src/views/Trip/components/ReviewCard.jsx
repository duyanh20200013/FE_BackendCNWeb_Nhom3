import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Button from '../../../components/Button';
import { IoMdClose } from 'react-icons/io';
//import TextField from '../custom-fields/TextField';

import { createReview, endContract } from '@/api/houseApi';



function ReviewCard({ onClose, data1 }) {
    const navigate = useNavigate();

    const number = [1, 2, 3, 4, 5];

    const [review, setReview] = useState('');
    const [star, setStar] = useState(0);

    const handleInput = function (e) {
        setReview(e.target.value)
    }

    const data = {
        houseId: data1.houseId,
        contractId: data1.contractId,
        star: star,
        description: review
    }

    const handleSubmit = async () => {
        try {
            console.log(data)
            await endContract({ contractId: data1.contractId })
            await createReview(data);
            navigate(0);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="card sm:w-[600px] max-w-full bg-base-100 shadow-xl">
            <h2 className="relative card-title justify-center py-5 border-b-[1px]">
                {onClose && <IoMdClose className="absolute left-8 cursor-pointer" size={24} onClick={onClose} />}
                Đánh giá chuyến đi
            </h2>
            <div className="card-body">
                <div className='mt-2 pb-6'>
                    <input
                        type="text"
                        placeholder='Mời bạn đánh giá về chuyến đi'
                        className='input input-bordered w-full  border-1 focus:border-2 focus:outline-0'
                        onChange={handleInput}
                    />
                </div>
                <div className='flex mt-2 pb-6 mr-2 items-center'>
                    <span className="pr-[16px] font-medium">Đánh giá</span>
                    {number.map((item, index) => (
                        <div key={index} onClick={() => { setStar(item) }}>
                            {item <= star ? <AiFillStar className='pr-[4px] cursor-pointer' size={32} /> : <AiOutlineStar className='pr-[4px] cursor-pointer' size={32} />}
                        </div>
                    ))}
                </div>
                <Button label="Gửi đánh giá" onClick={handleSubmit} />
            </div>
        </div>
    );
}

export default ReviewCard;
