import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useHouseOwner = () => {

    const userEmail = localStorage.getItem('access-email');
    const [axiosSecure] = useAxiosSecure();

    const { data: isHouseOwner } = useQuery({
        queryKey: ['isHouseOwner', userEmail],
        enabled: !!userEmail && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/house-owner?email=${userEmail}`)
            return res.data.houseOwner;
        }
    })

    return [isHouseOwner]
};

export default useHouseOwner;