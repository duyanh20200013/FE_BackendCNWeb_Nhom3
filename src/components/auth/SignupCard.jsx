import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../../helpers/yupConfig';
import Button from '../Button';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import TextField from '../custom-fields/TextField';
import { signUp } from '@/api/authApi';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp.'),
});

function SignupCard({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    // gender: '',
    image: '',
    role: 'Owner',
    password: '',
    passwordConfirm: '',
  });

  const handleInput = function (e) {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async function (data) {
    console.log(formData);
    const res = await signUp(data);

    if (!res?.data?.errCode) {
      toast.success('Đăng ký tài khoản thành công');
      navigate('/login');
    } else {
      toast.error(res?.data?.errMessage);
    }
  };

  return (
    <div className="card max-w-full sm:w-[600px] bg-base-100 shadow-xl text-center">
      <h2 className="relative card-title justify-center py-5 border-b-[1px]">
        {onClose && (
          <IoMdClose
            className="absolute left-8 cursor-pointer"
            size={24}
            onClick={onClose}
          />
        )}
        Đăng nhập hoặc đăng ký
      </h2>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="flex flex-col pb-2">
            <div className="self-start pb-4">
              <h1 className="text-2xl font-semibold">
                Chào mừng bạn đến với Airbnb
              </h1>
              <p className="text-left pt-1">
                Tham gia bằng cách tạo tài khoản mới!
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <TextField
                id="firstName"
                name="firstName"
                value={formData.firstName}
                type="text"
                placeholder="Tên"
                onChange={handleInput}
                register={register}
                error={errors.firstName}
              />
              <TextField
                id="lastName"
                name="lastName"
                value={formData.lastName}
                type="text"
                placeholder="Họ"
                onChange={handleInput}
                register={register}
                error={errors.lastName}
              />
              <TextField
                id="phone"
                name="phone"
                value={formData.phone}
                type="text"
                placeholder="Số điện thoại"
                onChange={handleInput}
                register={register}
                error={errors.phone}
              />
              <TextField
                id="email"
                name="email"
                value={formData.email}
                type="text"
                placeholder="Email"
                onChange={handleInput}
                register={register}
                error={errors.email}
              />
              <TextField
                id="password"
                name="password"
                value={formData.password}
                type="password"
                placeholder="Mật khẩu"
                onChange={handleInput}
                register={register}
                error={errors.password}
              />
              <TextField
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                type="password"
                placeholder="Xác nhận mật khẩu"
                onChange={handleInput}
                register={register}
                error={errors.passwordConfirm}
              />
            </div>
          </div>
          <div className="card-actions">
            <Button type="submit" label="Đăng ký" />
          </div>
        </form>
        <div className="divider">hoặc</div>
        <div className="flex flex-col gap-2">
          <Button
            icon={AiFillFacebook}
            label="Tiếp tục với Facebook"
            outline
          ></Button>
          <Button icon={FcGoogle} label="Tiếp tục với Google" outline></Button>
          <Button
            icon={AiFillApple}
            label="Tiếp tục với Apple"
            outline
          ></Button>
          <Button
            icon={HiOutlineMail}
            label="Tiếp tục bằng Email"
            outline
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default SignupCard;
