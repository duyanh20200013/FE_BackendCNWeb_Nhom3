import Navbar from '@/components/navbar/Navbar2';
import Container from '@/components/Container';
import AccountSettingBox from './components/AccountSettingBox';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiSolidUserAccount } from 'react-icons/bi';
import { MdSecurity, MdPayment } from 'react-icons/md';

const accountSettingList = [
  {
    label: 'Thông tin cá nhân',
    description:
      'Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ với bạn',
    icon: BiSolidUserAccount,
    link: 'personal-info',
  },
  {
    label: 'Đăng nhập và bảo mật',
    description: 'Cập nhật mật khẩu và bảo mật tài khoản của bạn',
    icon: MdSecurity,
    link: 'login-and-security',
  },
  {
    label: 'Thanh toán và chi trả',
    description:
      'Xem lại các khoản thanh toán, chi trả, phiếu giảm giá và thẻ quà tặng',
    icon: MdPayment,
    link: 'payments',
  },
];

function Account() {
  const user = useSelector(state => state.auth.user);

  const navigate = useNavigate();

  const handleLink = link => {
    navigate(link);
  };

  return (
    <div>
      <Navbar />
      <Container className="pt-14 mx-[52px]">
        <h1 className="font-bold text-3xl">Tài khoản</h1>
        <div className="text-lg">
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="">, {user?.email}</span>
          <span className="px-1">&middot;</span>
          <button className="underline font-semibold">Truy cập hồ sơ</button>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4">
          {accountSettingList.map(item => {
            return (
              <AccountSettingBox
                label={item.label}
                description={item.description}
                icon={item.icon}
                onClick={() => handleLink(item.link)}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Account;
