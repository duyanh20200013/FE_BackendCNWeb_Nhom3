import Container from '../Container';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';

function Navbar({ className = '' }) {
  return (
    <div className="border-b-[1px]">
      <Container className={`relative bg-white z-[100] ${className}`}>
        <header className="py-4 flex justify-between">
          <a href="/" className="flex items-center relative z-[101] h-12">
            <img src="/src/assets/app-icon.svg" className="h-8"></img>
          </a>
          <Menu className="relative z-[101] self-center h-10 flex items-center gap-2 border text-center border-gray-300 rounded-full py-2 pl-4 pr-1 hover:shadow-md cursor-pointer"></Menu>
        </header>
      </Container>
    </div>
  );
}

export default Navbar;
