import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import yup from '../../helpers/yupConfig';
import Button from '../Button';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import TextField from '../custom-fields/TextField';
import { thunkSignIn } from '/src/store/reducers/authSlice.js';

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginCard({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const user = useSelector(state => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [formData, setFormData] = useState({
    email: 'duyanh061202@gmail.com',
    password: '12345678',
  });

  const handleInput = function (e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async function () {
    // const res = await unwrapResult(await dispatch(thunkSignIn(formData)));
    const res = await dispatch(thunkSignIn(formData));
    console.log(res);

    if (res && res.payload.errCode === 0) {
      // console.log(res);
      if (location.pathname != '/login') {
        navigate(0);
      } else {
        navigate('/');
      }
      console.log(2);
    }

    console.log(formData);
  };

  return (
    <div className="card sm:w-[600px] max-w-full bg-base-100 shadow-xl">
      <h2 className="relative card-title justify-center py-5 border-b-[1px]">
        {onClose && (
          <IoMdClose
            className="absolute left-8 cursor-pointer"
            size={24}
            onClick={onClose}
          />
        )}
        Đăng nhập
      </h2>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col pb-2">
            <div className="self-start pb-4">
              <h1 className="text-2xl font-semibold">
                Chào mừng bạn đến với Airbnb
              </h1>
            </div>
            <div className="w-full flex flex-col gap-4">
              <TextField
                id="email"
                name="email"
                value={formData.email}
                type="text"
                placeholder="Email"
                className="input input-bordered w-full focus:border-black border-1 focus:border-2 focus:outline-0"
                onChange={handleInput}
                register={register}
                error={errors.email}
              />
              <TextField
                id="password"
                name="password"
                value={formData.password}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full focus:border-black border-1 focus:border-2 focus:outline-0"
                onChange={handleInput}
                register={register}
                error={errors.password}
              />
              <p></p>
            </div>
          </div>
          <div className="card-actions">
            <Button type="submit" label="Đăng nhập" />
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

export default LoginCard;
