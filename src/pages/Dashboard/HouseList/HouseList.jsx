import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

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

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://house-hunter-server-mehedihasan-ofc.vercel.app/houses/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        refetch();
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

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
                            <th>address</th>
                            <th>Edit</th>
                            <th>Delete</th>
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
                                    <span className='badge badge-secondary badge-outline'>{house.address}</span>
                                </td>
                                <td>
                                    <Link to={`/dashboard/house-edit/${house._id}`}>
                                        <button className="btn btn-xs">Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(house._id)} className="btn btn-xs">Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default HouseList;