import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const HouseEdit = () => {
    const { id } = useParams();
    const houseEdit = useLoaderData();
    const [axiosSecure] = useAxiosSecure();

    const { register, handleSubmit } = useForm({
        defaultValues: houseEdit,
    });

    const onSubmit = (data) => {
        console.log(data);

        const { _id, name, address, availability_date, bathrooms, bedrooms, city, description, owener_email, phone_number, rent_per_month, picture, room_size } = data;

        const updateHouse = { name, address, owener_email, picture, availability_date, bathrooms: parseFloat(bathrooms), bedrooms: parseFloat(bedrooms), city, description, phone_number, rent_per_month: parseFloat(rent_per_month), room_size };

        axiosSecure.put(`/houses-update/${_id}`, updateHouse)
            .then(data => {
                console.log("update House", data.data);

                if (data.data.modifiedCount > 0) {
                    toast.success(`Update successful.`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
    };

    return (
        <div className="my-container my-5">

            <h1 className="text-2xl font-bold mb-4">Edit House</h1>
            <div className="bg-white p-10 shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('name')}
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('address')}
                            />
                        </div>
                        <div>
                            <label htmlFor="availability_date" className="block text-sm font-medium text-gray-700 mb-2">Availability Date</label>
                            <input
                                type="date"
                                id="availability_date"
                                name="availability_date"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('availability_date')}
                            />
                        </div>
                        <div>
                            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                            <input
                                type="text"
                                id="bathrooms"
                                name="bathrooms"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('bathrooms')}
                            />
                        </div>
                        <div>
                            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                            <input
                                type="text"
                                id="bedrooms"
                                name="bedrooms"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('bedrooms')}
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('city')}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('description')}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('phone_number')}
                            />
                        </div>
                        <div>
                            <label htmlFor="rent_per_month" className="block text-sm font-medium text-gray-700 mb-2">Rent per Month</label>
                            <input
                                type="text"
                                id="rent_per_month"
                                name="rent_per_month"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('rent_per_month')}
                            />
                        </div>
                        <div>
                            <label htmlFor="room_size" className="block text-sm font-medium text-gray-700 mb-2">Room Size</label>
                            <input
                                type="text"
                                id="room_size"
                                name="room_size"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                {...register('room_size')}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HouseEdit;
