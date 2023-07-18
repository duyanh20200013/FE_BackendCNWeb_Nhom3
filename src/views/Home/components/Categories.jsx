import { TbBeach, TbPool } from 'react-icons/tb';
import { ImBasecamp } from 'react-icons/im';
import { GiPisaTower, GiBoatFishing } from 'react-icons/gi';
import { FaSkiingNordic } from 'react-icons/fa';
import { CgOptions } from 'react-icons/cg';
import CategoryBox from './CategoryBox';
import Container from '../../../components/Container';
import { getCategories } from '../../../api/categoryApi';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

function Categories({ fnShowFilter }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getCategories()
        .then(res => {
          setCategories(res.data.data);
        })
        .catch(err => {
          alert(err);
        });
    }
    fetchData();
  }, []);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <div className="pt-4 flex-1 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map(item => (
            <CategoryBox key={item.id} categoryId={item.id} label={item.name} linkIcon={item.linkIcon}></CategoryBox>
          ))}
        </div>
        <div className="w-22 ml-2">
          <Button
            label="Bộ lọc"
            icon={CgOptions}
            outline
            className="bg-white border-gray-300"
            onClick={fnShowFilter}
          ></Button>
        </div>
      </div>
    </Container>
  );
}

export default Categories;
