import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '/src/hooks/useOutsideClick';
import Avatar from '@/components/Avatar';
import { logOut, generateToken } from '@/api/authApi';
import request from '@/utils/request';
import authSlice from '@/store/reducers/authSlice';

const menuItemStyle = 'px-4 py-3 whitespace-nowrap block text-left text-sm hover:bg-neutral-100';

function Menu({ className }) {
  const [isMenu, setIsMenu] = useState(false);
  const currentUser = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOutsideMenu = () => {
    setIsMenu(false);
  };
  const menuRef = useOutsideClick(handleClickOutsideMenu);

  const fnShowMenu = e => {
    setIsMenu(true);
  };

  const fnLogout = async () => {
    await logOut();
    dispatch(authSlice.actions.signOut());
    navigate(0);
  };

  return (
    <>
      <div ref={menuRef} role="button" tabIndex={0} onClick={fnShowMenu} className={`${className} relative`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <Avatar firstName={currentUser.firstName} image={currentUser.image} />

        <div
          className={`absolute right-0 top-0 mt-12 py-2 min-w-[250px] rounded-xl bg-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.1)] overflow-hidden ${isMenu ? 'display' : 'hidden'
            }`}
        >
          <ul>
            <>
              <a href="" className={`${menuItemStyle} font-semibold`}>
                Hồ sơ
              </a>
              <a href="" className={`${menuItemStyle} font-semibold`}>
                Tài khoản
              </a>
              <div className="width-full h-[1px] my-2 bg-neutral-300"></div>
              <a href="/" className={`${menuItemStyle}`}>
                Chuyển sang chế độ du lịch
              </a>
              <button className={`${menuItemStyle} w-full`} onClick={fnLogout}>
                Đăng xuất
              </button>
            </>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;
