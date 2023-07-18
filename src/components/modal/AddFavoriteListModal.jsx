import { useState, useEffect, useCallback, memo } from 'react';
import { toast } from 'react-toastify';

import Modal from './Modal';
import AppInput from '@/components/inputs/AppInput';
import AppSelect from '@/components/inputs/AppSelect';
import Button from '@/components/Button';
import { getAllFavoriteList, createFavoriteHouse } from '@/api/customerApi';

function ActionElement2({ isDisabledCreate, onReset, onCreate }) {
  return (
    <div className="flex justify-between items-center">
      <button
        className="font-semibold underline p-[10px] m-[-10px]"
        onClick={onReset}
      >
        Xóa
      </button>
      <div className="max-w-[200px]">
        <Button disabled={isDisabledCreate} label="Tạo" onClick={onCreate} />
      </div>
    </div>
  );
}

function ActionElement1({ onAdd, onToggleModal }) {
  return (
    <div className="flex justify-between items-center">
      <button
        className="font-semibold underline p-[10px] m-[-10px]"
        onClick={onToggleModal}
      >
        Tạo danh sách mong muốn mới
      </button>
      <div className="max-w-[200px]">
        <Button label="Xác nhận" onClick={onAdd}></Button>
      </div>
    </div>
  );
}

function AddFavoriteListModal({ houseId, onAddSuccess, onClose, ...props }) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [currentModal, setCurrentModal] = useState(1);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    getFavoriteList();
  }, []);

  useEffect(() => {
    // console.log('is fav: ', favoriteList, favoriteList?.length ? 1 : 2);
    setCurrentModal(favoriteList.length ? 1 : 2);
  }, [favoriteList.length, favoriteList]);

  useEffect(() => {
    // console.log('Current Modal: ', currentModal, favoriteList?.length);
  }, [currentModal, favoriteList]);

  const handleCloseModal = useCallback(() => {
    if (props.open) {
      // console.log('Handle close Modal and length ', favoriteList.length);
      onClose();
      setCurrentModal(favoriteList?.length ? 1 : 2);
    }
  }, [favoriteList, favoriteList.length, props.open]);

  const getFavoriteList = async () => {
    const res = await getAllFavoriteList();
    setFavoriteList(
      res?.data?.data?.map(item => ({ label: item, value: item })),
    );
  };

  const handleInputListName = e => {
    setNewListName(e.target.value);
  };

  const handleCreateFavList = async () => {
    console.log('Create fav with: ', newListName, houseId);
    await createFavoriteHouse({ name: newListName, houseId }).then(res => {
      toast.success('Thêm vào danh sách yêu thích thành công!');
      onAddSuccess();
      onClose();
    });
  };

  const handleAddToFavList = async () => {
    console.log('Add fav with: ', selectedList, houseId);
    await createFavoriteHouse({ name: selectedList, houseId }).then(res => {
      toast.success('Thêm vào danh sách yêu thích thành công!');
      onAddSuccess();
      onClose();
    });
  };

  return (
    <>
      {currentModal == 1 ? (
        <Modal
          {...props}
          title="Thêm vào Danh sách yêu thích"
          action={() => (
            <ActionElement1
              onToggleModal={() => setCurrentModal(2)}
              onAdd={handleAddToFavList}
            />
          )}
          onClose={handleCloseModal}
        >
          <AppSelect
            options={favoriteList}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
            onChange={selected => setSelectedList(selected.value)}
          />
        </Modal>
      ) : (
        <Modal
          {...props}
          title="Tạo danh sách yêu thích"
          action={() => (
            <ActionElement2
              isDisabledCreate={!newListName || !newListName?.length}
              onReset={() => setNewListName('')}
              onCreate={handleCreateFavList}
            />
          )}
          onClose={handleCloseModal}
        >
          <AppInput
            value={newListName}
            label="Tên danh sách yêu thích"
            type="text"
            onChange={handleInputListName}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(AddFavoriteListModal);
