import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const HouseList = () => {

    const email = localStorage.getItem('access-email')
    const [axiosSecure] = useAxiosSecure();

    const { data: houses = [], refetch } = useQuery({
        queryKey: ['houses', email],
        enabled: !!email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/my-houses?email=${email}`)
            return res.data;
        }
    })

    console.log(houses);

    return (
        <div className='my-container my-5'>
            <div className="overflow-x-auto bg-white shadow-md">
                <table className="table">
                    {/* head */}
                    <thead className='uppercase'>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>House Name</th>
                            <th>RPM</th>
                            <th>AVAIL. Date</th>
                            <th>br</th>
                            <th>BTHRM</th>
                            <th>City</th>
                            <th>address</th>
                            {/* <th>Feedback</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            houses.map((house, idx) => <tr key={house._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={house.picture} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{house.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">${house.rent_per_month}</span>
                                </td>
                                <td>
                                    <span className='badge badge-accent badge-outline'>{house.availability_date}</span>
                                </td>
                                <td>
                                    <span className='badge badge-primary badge-outline'>{house.bedrooms}</span>
                                </td>
                                <td>
                                    <span className='badge badge-secondary badge-outline'>{house.bathrooms}</span>
                                </td>
                                <td>
                                    <span className='badge badge-secondary badge-outline'>{house.city}</span>
                                </td>
                                <td>
                                    <span className='badge badge-secondary badge-outline'>{house.address}</span>
                                </td>
                                {/* {myClass.feedback && <td>
                                    <button className="btn btn-ghost btn-xs">{myClass.feedback}</button>
                                </td>} */}
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default HouseList;