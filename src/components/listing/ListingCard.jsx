import { useState, useCallback, useMemo, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';

import Button from '../Button';
import HeartButton from '../HeartButton';
import NextBtnRnd from '../NextBtnRnd';
import PrevBtnRnd from '../PrevBtnRnd';

function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel = 'Hủy chuyến đi',
  actionId,
  onClick,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const { name, title, districtData, provinceData, houseImageIdData, star } =
    data;
  const [cardIndex, setCardIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  useEffect(() => {
    if (data.id === 2)
      console.log('re-render list card 2 with index:', cardIndex);
    console.log(data.id, isFavorite);
  });

  useEffect(() => {
    setIsFavorited(isFavorite);
  }, [isFavorite]);

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

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const nextImage = event => {
    event.stopPropagation();

    if (cardIndex != houseImageIdData.length - 1)
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
          <img
            src={houseImageIdData[cardIndex].url}
            alt=""
            className="object-cover h-full w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full items-center justify-between hidden group-hover:flex px-1">
            {cardIndex != 0 && (
              <PrevBtnRnd className="absolute left-0" onClick={prevImage} />
            )}
            <div className="flex-1"></div>
            {cardIndex != houseImageIdData.length - 1 && (
              <NextBtnRnd className="absolute right-0" onClick={nextImage} />
            )}
          </div>
          <div className="absolute top-2 right-2">
            <HeartButton
              onAddFavorite={onAddFavorite}
              onRemoveFavorite={onRemoveFavorite}
              isFavorite={isFavorited}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="font-semibold text-md">
              {districtData.name}, {provinceData.name}
            </div>
            <div className="font-light text-neutral-500">
              {title}
            </div>
            <div className="font-semibold">
              ${price}{' '}
              {!reservation && <span className="font-normal">/ đêm</span>}
            </div>
          </div>
          <div className="flex flex-col pl-[8px]">
            <div className="flex items-center">
              <AiFillStar />
              <span className="pl-[2px]">{star == 0 ? 'Mới' : star}</span>
            </div>
            <div></div>
          </div>
        </div>
        {/* {
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleAction}
          />
        } */}
      </div>
    </div>
  );
}

export default ListingCard;
