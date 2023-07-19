import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo-white.png';
import useHouseOwner from '../../../hooks/useHouseOwner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHouseOwner] = useHouseOwner();
  const token = localStorage.getItem('access-token');
  const email = localStorage.getItem('access-email');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    fetch('https://house-hunter-server-mehedihasan-ofc.vercel.app/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    })
      .then((response) => {
        if (response.ok) {
          // Clear the token from local storage
          localStorage.removeItem('access-token');
          localStorage.removeItem('access-email');
          
          navigate('/login');
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the logout error
      });
  }

  return (
    <nav className={location.pathname === '/' ? 'absolute top-0 left-0 w-full text-white py-2 px-6 z-10' : 'bg-green-600'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white">
              <div className='w-40'>
                <img src={Logo} alt="" />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-[#FF7703]" : "text-white"}>Home</NavLink>

              {token && email && <NavLink to={isHouseOwner ? '/dashboard/house-list' : '/dashboard/my-bookings'} className={({ isActive }) => isActive ? "text-[#FF7703]" : "text-white"}>Dashboard</NavLink>}

              {token && email ? <button onClick={handleSignOut} className='btn btn-sm'>Log Out</button> : <button onClick={() => navigate('/login')} className='btn btn-sm'>Login</button>}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>

            {token && email && <Link to={isHouseOwner ? '/dashboard/house-list' : '/dashboard/my-bookings'} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>}

            {token && email ? <button onClick={handleSignOut} className='btn btn-sm'>Log Out</button> : <button onClick={() => navigate('/login')} className='btn btn-sm'>Login</button>}
          </div>
        </div>
      </div>
      {isMenuOpen && <div className="md:hidden bg-gray-800 h-16"></div>}
    </nav>
  );
};

export default Navbar;
