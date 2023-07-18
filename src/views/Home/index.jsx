import Navbar from '@/components/navbar/Navbar';
import Categories from './components/Categories';
import Button from '@/components/Button';
import Container from '@/components/Container';
import BookingListEmpty from './components/BookingListEmpty';
import BookingList from './components/BookingList';
import { TbBeach, TbPool } from 'react-icons/tb';
import { getHouseOfType, searchHouse } from '@/api/houseApi';
import { getCategories } from '@/api/categoryApi';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import qs from 'qs';
import FilterModal from './components/FilterModal';
function Home() {
  const location = useLocation();
  const queryParams = location.search;

  const [isEmpty, setIsEmpty] = useState(false);
  const [houseList, setHouseList] = useState([]);
  const [isFilterModal, setIsFilterModal] = useState(false);

  useEffect(() => {
    console.log('re-render home');
  });

  useEffect(() => {
    console.log('Home query: ', queryParams);

    const paramsData = qs.parse(queryParams, { ignoreQueryPrefix: true });

    async function getHouseList() {
      try {
        const res = await searchHouse(paramsData);
        setHouseList(res.data.data);
      } catch (err) {
        alert(err);
      }
    }

    getHouseList();
  }, [queryParams]);

  return (
    <div>
      <Navbar />
      <Categories fnShowFilter={() => setIsFilterModal(true)} />
      {/* <Button label="Button Test" icon={TbBeach}></Button> */}

      {/* Content */}
      <Container>
        <div>{isEmpty ? <BookingListEmpty></BookingListEmpty> : <BookingList houseList={houseList}></BookingList>}</div>
      </Container>
      <FilterModal open={isFilterModal} onClose={() => setIsFilterModal(false)}></FilterModal>
    </div>
  );
}

export default Home;
