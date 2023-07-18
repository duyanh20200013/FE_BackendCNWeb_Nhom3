import { Link } from 'react-router-dom';
import Container from '@/components/Container';
import Menu from './Menu';

function Navbar({ className = '' }) {
  return (
    <div className="border-b-[1px]">
      <Container className={`relative bg-white z-[100] ${className}`}>
        <header className="py-4 flex justify-between">
          <Link to="/" className="flex items-center relative z-[101] h-12">
            <img src="/src/assets/app-icon.svg" className="h-8"></img>
          </Link>
          <div className="flex items-center">
            <Link
              to="/hosting/listing"
              className="px-4 py-[10px] cursor-pointer font-medium text-sm text-neutral-500  rounded-full hover:bg-neutral-100"
            >
              Nhà/phòng cho thuê
            </Link>
            <Link
              to="/hosting/reservations"
              className="px-4 py-[10px] cursor-pointer font-medium text-sm text-neutral-500  rounded-full hover:bg-neutral-100"
            >
              Quản lý các hợp đồng
            </Link>
            <Link
              to="/hosting/adding"
              className="px-4 py-[10px] cursor-pointer font-medium text-sm text-neutral-500  rounded-full hover:bg-neutral-100"
            >
              Tạo mục cho thuê
            </Link>
          </div>
          <Menu className="relative z-[101] self-center h-10 flex items-center gap-2 border text-center border-gray-300 rounded-full py-2 pl-4 pr-1 hover:shadow-md cursor-pointer"></Menu>
        </header>
      </Container>
    </div>
  );
}

export default Navbar;
