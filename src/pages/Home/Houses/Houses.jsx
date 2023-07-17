import { useQuery } from '@tanstack/react-query';
import React from 'react';
import HouseCard from '../../../components/HouseCard/HouseCard';

const Houses = () => {

    const { data: houses = [], isLoading } = useQuery({
        queryKey: ['houses'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/houses');
            return res.json();
        }
    });

    return (
        <div className='max-w-7xl w-full mx-auto px-6 my-10'>
            <div className='text-center'>
                <h2 className='text-4xl font-semibold'>The Best Way To Find Your House</h2>
                <p className='text-xl font-light mt-2'>Help your visitors find the right property by letting them set various search criteria</p>
            </div>
            {/* Search box */}


            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
                {
                    houses.map(house => <HouseCard key={house._id} house={house} />)
                }
            </div>
        </div>
    );
};

export default Houses;