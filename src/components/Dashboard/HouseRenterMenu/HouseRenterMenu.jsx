import React from 'react';
import { FaLandmark } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const HouseRenterMenu = () => {
    return (
        <>
            <li className='font-medium text-sm my-2'><NavLink to='/dashboard/my-bookings'><FaLandmark /> My Bookings</NavLink></li>
        </>
    );
};

export default HouseRenterMenu;