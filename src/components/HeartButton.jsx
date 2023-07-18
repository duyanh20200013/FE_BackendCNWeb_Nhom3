import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const defaultFn = () => {};

function HeartButton({
  onClick = defaultFn,
  isFavorite = false,
  onAddFavorite = defaultFn,
  onRemoveFavorite = defaultFn,
}) {
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  useEffect(() => {
    setIsFavorited(isFavorite);
  }, [isFavorite]);

  const fnToggleFavorite = e => {
    e.stopPropagation();
    if (isFavorited) {
      onRemoveFavorite();
      setIsFavorited(!isFavorited);
    } else {
      onAddFavorite();
    }
  };

  return (
    <div onClick={fnToggleFavorite} className="relative cursor-pointer">
      <AiOutlineHeart
        size={28}
        className="fill-white absolute top-[-2px] right-[-2px]"
      />
      <AiFillHeart
        size={24}
        className={isFavorited ? 'fill-rose-500' : 'fill-black/20'}
      />
    </div>
  );
}

export default HeartButton;
