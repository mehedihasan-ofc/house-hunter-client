import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);

    fetch(`https://house-hunter-server-mehedihasan-ofc.vercel.app/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.result.acknowledged) {
          toast.success(`Login successfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          localStorage.setItem('access-email', resData.email);
          localStorage.setItem('access-token', resData.token);

          // const { data: isRole } = useQuery({
          //   queryKey: ['isRole', userEmail],
          //   enabled: !!localStorage.getItem('access-email') && !!localStorage.getItem('access-token'),
          //   queryFn: async () => {
          //     const res = await axiosSecure.get(`/get-role?email=${localStorage.getItem('access-email')}`)
          //     return res.data.houseOwner;
          //   }
          // })

          fetch(`https://house-hunter-server-mehedihasan-ofc.vercel.app/get-role?email=${data?.email}`)
            .then(res => res.json())
            .then(data => {
              navigate(data.role === "House Owner" ? '/dashboard/house-list' : '/dashboard/my-bookings');
            })
        }

      })
      .catch(error => {
        toast.error('Email not found', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-full p-8 my-5">
      <div className="bg-white shadow-lg rounded p-6 w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-center mb-6">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', { required: true })}
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-2 mr-2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required.</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>

          <p className="block text-gray-700 text-center text-sm font-bold mt-2">
            New to HouseHunter? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
