import React from 'react';
import { FaLandmark, FaPlusCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const HouseOwnerMenu = () => {
    return (
        <>
            <li className='font-medium text-sm my-2'><NavLink to='/dashboard/house-list'><FaLandmark /> My House List</NavLink></li>
            <li className='font-medium text-sm my-2'><NavLink to='/dashboard/add-new-house'><FaPlusCircle /> Add New House</NavLink></li>
        </>
    );
};

export default HouseOwnerMenu;