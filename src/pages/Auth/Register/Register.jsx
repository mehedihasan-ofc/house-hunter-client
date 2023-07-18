import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {

        // send new user data to server
        fetch(`http://localhost:5000/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((resData) => {
                console.log(resData);
                if (resData.result.insertedId) {
                    toast.success(`Registered successfully`, {
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
                    
                    navigate(data.role === "House Owner" ? '/dashboard/house-list' : '/dashboard/my-bookings');
                }
            })
            .catch(error => {
                toast.error('Email already exists', {
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
                    <h2 className="text-2xl text-center mb-6">Registration</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            {...register('fullName', { required: true })}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">Full Name is required.</p>}
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full mb-4 mr-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                Role
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="role"
                                {...register('role', { required: true })}
                            >
                                <option value="">Select your role</option>
                                <option value="House Owner">House Owner</option>
                                <option value="House Renter">House Renter</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-xs mt-1">Role is required.</p>}
                        </div>
                        <div className="w-full mb-4 ml-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phoneNumber"
                                type="tel"
                                placeholder="Enter your phone number"
                                {...register('phoneNumber', { required: true })}
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">Phone Number is required.</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">Email is required and must be valid.</p>}
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
                            Register
                        </button>
                    </div>

                    <p className="block text-gray-700 text-center text-sm font-bold mt-2">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;