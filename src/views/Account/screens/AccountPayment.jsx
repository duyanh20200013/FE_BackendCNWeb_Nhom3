import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Navbar from '@/components/navbar/Navbar2';
import Container from '@/components/Container';
import AccountSettingBox from '../components/AccountSettingBox';
import yup from '@/helpers/yupConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdPayment } from 'react-icons/md';
import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';
import AppInput from '@/components/inputs/AppInput';
import {
  createVerifyInfo,
  getVerifyInfo,
  updateVerifyInfo,
} from '@/api/ownerApi';

const validationSchema = yup.object({
  cardNumber: yup.number().required(),
  CCCDNumber: yup.number().required(),
  accountName: yup.string().required(),
  bankName: yup.string().required(),
});

function AccountPayment() {
  const [verifyInfo, setVerifyInfo] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    checkVerifyInfo();
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: '',
      accountName: '',
      bankName: '',
      CCCDNumber: '',
      // "CCCDfrontImage":null,
      // "CCCDbackImage":null
    },
    resolver: yupResolver(validationSchema),
  });

  const formData = watch();

  const onAddPayment = async data => {
    console.log(data);
    await createVerifyInfo(data)
      .then(res => {
        toast.success('Thêm thông tin thẻ thành công!');
        setShowAddModal(false);
      })
      .catch(() => {
        toast.error('Thêm thông tin thẻ thất bại!');
      });
  };

  const onUpdatePayment = async data => {
    console.log(data);
    await updateVerifyInfo(data)
      .then(res => {
        toast.success('Thay đổi thông tin thẻ thành công!');
        setShowAddModal(false);
      })
      .catch(() => {
        toast.error('Thay đổi thông tin thẻ thất bại!');
      });
  };

  const checkVerifyInfo = async () => {
    const res = await getVerifyInfo({ userId: user?.id });
    console.log(res?.data);
    if (res?.data?.errCode) {
      setVerifyInfo(null);
    } else {
      setVerifyInfo(res?.data?.data);
      reset(res?.data?.data);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <Container className="pt-14">
        <div className="flex">
          <div className="">
            <h1 className="font-bold text-3xl leading-10">
              Phương thức thanh toán
            </h1>
            <span className="text-gray-500">
              Thêm phương thức thanh toán bằng hệ thống thanh toán an toàn của
              chúng tôi, sau đó bắt đầu lập kế hoạch cho chuyến đi tiếp theo của
              bạn.
            </span>
            <div className="w-full mt-8 mb-6 bg-gray-200 h-[1px]"></div>
            <div className="w-fit">
              {verifyInfo ? (
                <Button
                  label="Thay đổi thức thanh toán"
                  outline
                  onClick={() => setShowAddModal(true)}
                />
              ) : (
                <Button
                  label="Thêm phương thức thanh toán"
                  outline
                  onClick={() => setShowAddModal(true)}
                />
              )}
            </div>
          </div>

          <div className="min-w-[300px] max-w-[400px] ml-[86px]">
            <AccountSettingBox
              label="Thực hiện tất cả các thanh toán qua Airbnb"
              description="Luôn thanh toán và liên lạc qua Airbnb để đảm bảo bạn được bảo vệ theo Điều khoản dịch vụ, Điều khoản dịch vụ thanh toán, chính sách hủy và các biện pháp bảo vệ khác của chúng tôi. Tìm hiểu thêm"
              icon={MdPayment}
            ></AccountSettingBox>
          </div>
        </div>
      </Container>

      <Modal
        open={showAddModal}
        title={`${
          verifyInfo ? 'Thay đổi thông tin thẻ' : 'Thêm thông tin thẻ'
        }`}
        onClose={() => setShowAddModal(false)}
        action={() => {
          return (
            <div className="flex justify-between items-center">
              <button className="font-semibold underline p-[10px] m-[-10px]">
                Hủy
              </button>
              <div className="max-w-[200px]">
                <Button
                  label="Hoàn tất"
                  onClick={
                    verifyInfo
                      ? handleSubmit(onUpdatePayment)
                      : handleSubmit(onAddPayment)
                  }
                ></Button>
              </div>
            </div>
          );
        }}
      >
        <div className="flex flex-col gap-2">
          <AppInput
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            type="text"
            className="input input-bordered w-full focus:border-black border-1 focus:border-2 focus:outline-0"
            onChange={e => setValue('cardNumber', e.target.value)}
            register={register}
            error={errors.cardNumber}
            label="Số thẻ"
          />
          <AppInput
            id="accountName"
            name="accountName"
            value={formData.accountName}
            type="text"
            className="input input-bordered w-full focus:border-black border-1 focus:border-2 focus:outline-0"
            onChange={e => setValue('accountName', e.target.value)}
            register={register}
            error={errors.accountName}
            label="Tên tài khoản"
          />
          <AppInput
            id="bankName"
            name="bankName"
            value={formData.bankName}
            type="text"
            className="input input-bordered w-full focus:border-black border-1 focus:border-2 focus:outline-0"
            onChange={e => setValue('bankName', e.target.value)}
            register={register}
            error={errors.bankName}
            label="Ngân hàng"
          />
          <AppInput
            id="CCCDNumber"
            name="CCCDNumber"
            value={formData.CCCDNumber}
            type="text"
            className="input input-bordered w-full focus:border-black border-1 focus:border-2 focus:outline-0"
            onChange={e => setValue('CCCDNumber', e.target.value)}
            register={register}
            error={errors.CCCDNumber}
            label="Số CCCD"
          />
        </div>
      </Modal>
    </div>
  );
}

export default AccountPayment;
