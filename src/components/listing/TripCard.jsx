import { useState, useCallback, useMemo, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';

import Button from '../Button';
import HeartButton from '../HeartButton';
import NextBtnRnd from '../NextBtnRnd';
import PrevBtnRnd from '../PrevBtnRnd';

function TripCard({ data, reservation, onAction, disabled, actionId, onClick, fnShowReview, fnShowCancel }) {
    const { id, arriveDate, leftDate, price, status, houseContractData } = data;
    const [cardIndex, setCardIndex] = useState(0);

    const endDate = new Date(leftDate);
    const startDate = new Date(arriveDate);
    const currentDate = new Date();

    const label = () => {
        if (status == 'Huỷ') return 'Đã huỷ';
        if (status == 'Hoàn tiền') return 'Đã huỷ';
        if (status == 'Hoàn tất thanh toán' && endDate.getTime() > currentDate.getTime()) {
            return 'Huỷ';
        }
        if (status == 'Hoàn tất thanh toán' && endDate.getTime() <= currentDate.getTime()) {
            return 'Đánh giá';
        }
        return status
    }

    const disable = () => {
        if (status == 'Hoàn tất thanh toán') return false;
        return true;
    }

    const handleClick = () => {
        if (label() == 'Đánh giá') {
            const info = {
                houseId: houseContractData.id,
                contractId: id
            }
            fnShowReview(info)
        }
        if (label() == 'Huỷ') {
            var refund = false;
            if (startDate.getTime() > currentDate.getTime()) {
                refund = true;
            }
            const info1 = {
                contractId: id,
                refund: refund
            }
            fnShowCancel(info1)
        }
    }

    const handleAction = useCallback(
        e => {
            e.stopPropagation();
            if (disabled) {
                return;
            }

            onAction?.(actionId);
        },
        [disabled, onAction, actionId],
    );

    const nextImage = event => {
        event.stopPropagation();

        if (cardIndex != houseContractData.houseImageIdData.length - 1)
            setCardIndex(prev => {
                console.log('after next: ', prev + 1);
                return prev + 1;
            });
    };

    const prevImage = event => {
        event.stopPropagation();

        if (cardIndex != 0)
            setCardIndex(prev => {
                console.log('after prev: ', prev - 1);
                return prev - 1;
            });

        return cardIndex;
    };

    return (
        <div className="col-span-1 cursor-pointer group" onClick={onClick}>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square relative overflow-hidden rounded-xl">
                    <img src={houseContractData.houseImageIdData[cardIndex].url} alt="" className="object-cover h-full w-full" />
                    <div className="absolute top-0 left-0 w-full h-full items-center justify-between hidden group-hover:flex px-1">
                        {cardIndex != 0 && <PrevBtnRnd className="absolute left-0" onClick={prevImage} />}
                        <div className="flex-1"></div>
                        {cardIndex != houseContractData.houseImageIdData.length - 1 && (
                            <NextBtnRnd className="absolute right-0" onClick={nextImage} />
                        )}
                    </div>
                    <div className="absolute top-2 right-2">
                        <HeartButton />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="font-semibold text-md">
                            {houseContractData.name}
                        </div>
                        <div className="font-light text-neutral-500">{houseContractData.title}</div>
                        <div className="font-light text-neutral-500">{arriveDate.substring(8, 10)} tháng {arriveDate.substring(5, 7)} - {leftDate.substring(8, 10)} tháng {leftDate.substring(5, 7)}</div>
                        <div className="font-semibold">
                            ${price}
                        </div>
                    </div>
                    <div className="flex flex-col pl-[8px]">
                        <div className="flex items-center">
                            <AiFillStar />
                            <span className="pl-[2px]">{houseContractData.star || 'Mới'}</span>
                        </div>
                        <div></div>
                    </div>
                </div>
                {<Button disabled={disable()} small label={label()} onClick={handleClick} />}
            </div>
        </div>
    );
}

export default TripCard;