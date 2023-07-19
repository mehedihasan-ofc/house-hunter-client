import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import HouseOwnerMenu from '../components/Dashboard/HouseOwnerMenu/HouseOwnerMenu';
import HouseRenterMenu from '../components/Dashboard/HouseRenterMenu/HouseRenterMenu';
import useHouseOwner from '../hooks/useHouseOwner';

const DashboardLayout = () => {

    const [isHouseOwner] = useHouseOwner();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-[#F4F7FE] flex flex-col items-center">
                {/* Page content here */}

                <Outlet />

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 h-full bg-white text-base-content">
                    {/* Sidebar content here */}

                    {isHouseOwner ? <HouseOwnerMenu /> : <HouseRenterMenu />}

                    <div className="divider"></div>
                    <li className='font-medium text-sm'><Link to='/'><FaHome /> Home</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;