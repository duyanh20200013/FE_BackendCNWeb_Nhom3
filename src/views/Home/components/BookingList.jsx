import { memo, useCallback } from 'react';
import { useEffect, useState } from 'react';
import Container from '@/components/Container';
import ListingCard from '@/components/listing/ListingCard';
import AddFavoriteListModal from '@/components/modal/AddFavoriteListModal';
import { getAllFavoriteHouse, deleteFavoriteHouse } from '@/api/customerApi';

function BookingList({ houseList }) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [isAddFavModal, setIsAddFavModal] = useState(false);
  const [houseId, setHouseId] = useState(null);

  useEffect(() => {
    getFavoriteList();
  }, []);

  useEffect(() => {
    console.log('re-render booking list');
  });

  const getFavoriteList = async () => {
    console.log('Add success');
    const res = await getAllFavoriteHouse();
    setFavoriteList(res?.data?.data);
  };

  const handleLink = houseId => {
    window.open(`/house/${houseId}`, '_blank');
  };

  const handleAddFavorite = houseId => {
    console.log('Add fav: ', houseId);
    setHouseId(houseId);
    setIsAddFavModal(true);
  };

  const hanldeRemoveFavorite = async houseId => {
    console.log('Remove fav: ', houseId);
    await deleteFavoriteHouse({ houseId });
    await getFavoriteList();
  };

  const handleCloseModal = useCallback(() => setIsAddFavModal(false), []);

  console.log(houseList);
  return (
    <>
      <div
        className="
          pt-12
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
      >
        {houseList?.map(item => (
          <ListingCard
            key={item.id}
            data={item}
            onClick={() => handleLink(item.id)}
            isFavorite={favoriteList?.includes(item.id)}
            onAddFavorite={() => handleAddFavorite(item.id)}
            onRemoveFavorite={() => hanldeRemoveFavorite(item.id)}
          ></ListingCard>
        ))}
      </div>
      <AddFavoriteListModal
        open={isAddFavModal}
        onClose={handleCloseModal}
        houseId={houseId}
        onAddSuccess={getFavoriteList}
      />
    </>
  );
}

export default memo(BookingList);
