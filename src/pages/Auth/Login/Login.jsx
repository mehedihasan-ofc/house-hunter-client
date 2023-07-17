import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Perform login functionality here
    };

    return (
        <div className="flex justify-center items-center h-full my-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5 border" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl mb-6">Login</h2>
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
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', { required: true })}
                    />
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

                <p className="block text-gray-700 text-center text-sm font-bold mt-2">New to HouseHunter? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
