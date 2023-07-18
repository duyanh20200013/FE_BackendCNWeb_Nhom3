import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import useOutsideClick from '/src/hooks/useOutsideClick';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';
import Avatar from '../Avatar';
import { logOut, generateToken } from '@/api/authApi';
import request from '@/utils/request';
import authSlice from '@/store/reducers/authSlice';

const menuItemStyle = 'px-4 py-3 whitespace-nowrap block text-left text-sm hover:bg-neutral-100';

function Menu({ className }) {
  const [isMenu, setIsMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const isLogin = useSelector(state => state.auth.isLogin);
  const currentUser = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOutsideMenu = () => {
    setIsMenu(false);
  };
  const menuRef = useOutsideClick(handleClickOutsideMenu);

  const fnShowLogin = e => {
    e.stopPropagation();
    setShowLogin(true);
    setIsMenu(false);
  };

  const fnShowSignup = e => {
    e.stopPropagation();
    setShowSignup(true);
    setIsMenu(false);
  };

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
        {isLogin ? (
          <Avatar firstName={currentUser.firstName} image={currentUser.image} />
        ) : (
          <div className="bg-gray-500 text-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        <div
          className={`absolute right-0 top-0 mt-12 py-2 min-w-[300px] rounded-xl bg-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.1)] overflow-hidden ${isMenu ? 'display' : 'hidden'
            }`}
        >
          <ul>
            {isLogin ? (
              <>
                <Link to="/trip" className={`${menuItemStyle} font-semibold`}>
                  Chuyến đi
                </Link>
                <Link to="/" className={`${menuItemStyle} font-semibold`}>
                  Danh sách yêu thích
                </Link>
                <div className="width-full h-[1px] my-2 bg-neutral-300"></div>
                {currentUser.role == 'Admin' ? <a href="/Admin" className={`${menuItemStyle}`}>
                  Trang quản lý
                </a> : null}
                {currentUser.role == 'Owner' ? <a href="/hosting" className={`${menuItemStyle}`}>
                  Quản lý nhà/phòng cho thuê
                </a> : null}
                <Link to="/" className={`${menuItemStyle}`}>
                  Tài khoản
                </Link>
                <div className="width-full h-[1px] my-2 bg-neutral-300"></div>
                <Link to="/" className={`${menuItemStyle}`}>
                  Trợ giúp
                </Link>
                <button className={`${menuItemStyle} w-full`} onClick={fnLogout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${menuItemStyle} w-full`}
                  // onClick={() => window.login_modal.showModal()}
                  onClick={fnShowSignup}
                >
                  Đăng ký
                </button>
                <button className={`${menuItemStyle} w-full`} onClick={fnShowLogin}>
                  Đăng nhập
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
      <LoginModal isShow={showLogin} handleClose={() => setShowLogin(false)} />
      <SignupModal isShow={showSignup} handleClose={() => setShowSignup(false)} />
    </>
  );
}

export default Menu;
