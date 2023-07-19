import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

// image hoisting token
const img_hoisting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddNewHouse = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [axiosSecure] = useAxiosSecure();
    const email = localStorage.getItem('access-email');

    const imageHostingUrl = `https://api.imgbb.com/1/upload`;

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('key', '4fae771306f37d10d347d646189f7b4e');
        formData.append('image', data.picture[0]);

        try {
            const response = await fetch(imageHostingUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                const imgURL = responseData.data.display_url;

                const { name, address, availability_date, bathrooms, bedrooms, city, description, phone_number, rent_per_month, room_size } = data;
                const newHouse = { name, address, owener_email: email, picture: imgURL, availability_date, bathrooms: parseFloat(bathrooms), bedrooms: parseFloat(bedrooms), city, description, phone_number, rent_per_month: parseFloat(rent_per_month), room_size };

                axiosSecure.post('/houses', newHouse)
                    .then(data => {
                        console.log("add new House", data.data);

                        if (data.data.insertedId) {
                            reset();
                            toast.success(`Submitting the new ${name} house was successful.`, {
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

            } else {
                console.log('Image upload failed:', response.status);
            }
        } catch (error) {
            console.log('Image upload error:', error);
        }
    };

    return (
        <div className="my-container my-5">
            <h1 className="text-2xl font-bold mb-4">Add New House</h1>
            <div className="bg-white p-10 shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                            House Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            id="name"
                            className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">House Name is required</span>
                        )}
                    </div>

                    <div className="flex mb-4">
                        <div className="mr-2 flex-1">
                            <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('address', { required: true })}
                                type="text"
                                id="address"
                                className={`w-full px-3 py-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.address && (
                                <span className="text-red-500 text-sm">Address is required</span>
                            )}
                        </div>

                        <div className="ml-2 flex-1">
                            <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('city', { required: true })}
                                type="text"
                                id="city"
                                className={`w-full px-3 py-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.city && (
                                <span className="text-red-500 text-sm">City is required</span>
                            )}
                        </div>
                    </div>

                    <div className="flex mb-4">
                        <div className="mr-2 flex-1">
                            <label htmlFor="bedrooms" className="block mb-1 text-sm font-medium text-gray-700">
                                Bedrooms <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('bedrooms', { required: true })}
                                type="number"
                                id="bedrooms"
                                className={`w-full px-3 py-2 border rounded ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.bedrooms && (
                                <span className="text-red-500 text-sm">Bedrooms is required</span>
                            )}
                        </div>

                        <div className="ml-2 flex-1">
                            <label htmlFor="bathrooms" className="block mb-1 text-sm font-medium text-gray-700">
                                Bathrooms <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('bathrooms', { required: true })}
                                type="number"
                                id="bathrooms"
                                className={`w-full px-3 py-2 border rounded ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.bathrooms && (
                                <span className="text-red-500 text-sm">Bathrooms is required</span>
                            )}
                        </div>
                    </div>

                    <div className="flex mb-4">
                        <div className="mr-2 flex-1">
                            <label htmlFor="room_size" className="block mb-1 text-sm font-medium text-gray-700">
                                Room Size <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('room_size', { required: true })}
                                type="text"
                                id="room_size"
                                className={`w-full px-3 py-2 border rounded ${errors.room_size ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.room_size && (
                                <span className="text-red-500 text-sm">Room Size is required</span>
                            )}
                        </div>

                        <div className="ml-2 flex-1">
                            <label htmlFor="picture" className="block mb-1 text-sm font-medium text-gray-700">
                                Picture <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('picture', { required: true })}
                                type="file"
                                id="picture"
                                accept="image/*"
                                className={`w-full ${errors.picture ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.picture && (
                                <span className="text-red-500 text-sm">Picture is required</span>
                            )}
                        </div>
                    </div>

                    <div className="flex mb-4">
                        <div className="mr-2 flex-1">
                            <label htmlFor="availability_date" className="block mb-1 text-sm font-medium text-gray-700">
                                Availability Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('availability_date', { required: true })}
                                type="date"
                                id="availability_date"
                                className={`w-full px-3 py-2 border rounded ${errors.availability_date ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.availability_date && (
                                <span className="text-red-500 text-sm">Availability Date is required</span>
                            )}
                        </div>

                        <div className="ml-2 flex-1">
                            <label htmlFor="rent_per_month" className="block mb-1 text-sm font-medium text-gray-700">
                                Rent per Month <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('rent_per_month', { required: true })}
                                type="number"
                                id="rent_per_month"
                                className={`w-full px-3 py-2 border rounded ${errors.rent_per_month ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.rent_per_month && (
                                <span className="text-red-500 text-sm">Rent per Month is required</span>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block mb-1 text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('phone_number', {
                                required: true,
                                pattern: /^(?:\+88|01)?(?:\d{11}|\d{13})$/,
                            })}
                            type="tel"
                            id="phone_number"
                            className={`w-full px-3 py-2 border rounded ${errors.phone_number ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.phone_number?.type === 'required' && (
                            <span className="text-red-500 text-sm">Phone Number is required</span>
                        )}
                        {errors.phone_number?.type === 'pattern' && (
                            <span className="text-red-500 text-sm">
                                Please enter a valid Bangladeshi phone number
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register('description', { required: true })}
                            id="description"
                            rows="4"
                            className={`w-full px-3 py-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                        ></textarea>
                        {errors.description && (
                            <span className="text-red-500 text-sm">Description is required</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Add House
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewHouse;
