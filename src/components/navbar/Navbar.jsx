import Container from '../Container';
import SearchBar from './SearchBar';
import searchSlice from '../../store/reducers/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';

function Navbar({ className = '' }) {
  const isSearch = useSelector(state => state.search.isSearch);
  const navHeight = useSelector(state => state.app.navHeight);

  const dispatch = useDispatch();

  const setIsSearch = value => {
    dispatch(searchSlice.actions.setIsSearch(value));
  };

  return (
    <div className={`${!isSearch ? 'border-b-[1px]' : ''}`}>
      <Container className={`relative bg-white z-[100] ${className} max-h-[${navHeight}px]`}>
        <header className="py-4 flex justify-between">
          <a href="/" className="flex items-center relative z-[101] h-12">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg> */}
            <img src="/src/assets/app-icon.svg" className="h-8"></img>
          </a>
          <SearchBar />
          <Menu className="relative z-[101] self-center h-10 flex items-center gap-2 border text-center border-gray-300 rounded-full py-2 pl-4 pr-1 hover:shadow-md cursor-pointer"></Menu>
        </header>
      </Container>
      <div
        className={`fixed bg-[rgba(0,0,0,0.25)] left-0 top-0 bottom-0 right-0 z-[99] ${isSearch ? 'block' : 'hidden'}`}
        onClick={() => setIsSearch(false)}
      ></div>
    </div>
  );
}

export default Navbar;
