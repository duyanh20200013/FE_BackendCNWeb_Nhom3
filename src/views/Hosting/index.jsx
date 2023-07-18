import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Container from '@/components/Container';
import { getVerifyInfo } from '@/api/ownerApi';
import { PiWarningCircleBold } from 'react-icons/pi';

function Hosting() {
  const [isVerify, setIsVerify] = useState(false);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    checkVerifyInfo();
  }, []);

  const checkVerifyInfo = async () => {
    const res = await getVerifyInfo({ userId: user?.id });
    console.log(res?.data);
    if (res?.data?.errCode) {
      setIsVerify(false);
    } else {
      setIsVerify(true);
    }
  };

  return (
    <div>
      <Navbar />

      <Container>
        <div className="pt-8">
          <h1 className="font-bold text-3xl">
            Chào mừng quay trở lại, {user?.firstName}
          </h1>
          <div className="grid grid-cols-3 mt-6 gap-4">
            {isVerify ? (
              <></>
            ) : (
              <div className="col-span-1 border-[1px] rounded-lg flex p-4 min-h-[120px] justify-between">
                <div className="flex flex-col items-start justify-between">
                  <div>
                    <h3 className="font-bold">Xác thực thông tin tài khoản</h3>
                    <span className="text-red-600">
                      Là yêu cầu bắt buộc để đăng
                    </span>
                  </div>
                  <button className="font-semibold underline">Bắt đầu</button>
                </div>
                <div className="flex items-center justify-center">
                  <PiWarningCircleBold size={24} fill="red" />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hosting;
