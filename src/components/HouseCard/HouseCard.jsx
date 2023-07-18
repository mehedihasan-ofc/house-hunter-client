import React from 'react';
import { FaDollarSign, FaRegStar, FaBed, FaToriiGate, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HouseCard = ({ house }) => {

    const { picture, name, address, city, bedrooms, bathrooms, room_size, availability_date, rent_per_month } = house;

    return (

        <div className="card w-full mb-5 md:mb-0 md:w-96 bg-base-100 shadow rounded-none">
            <figure><img className='relative transition duration-300 ease-in-out' src={picture} alt="Shoes" /></figure>
            {/* <span className='bg-black bg-opacity-30 px-2 py-1 rounded-md text-white absolute top-5 left-5 text-sm'>{city}</span> */}
            <span className='bg-black bg-opacity-30 px-2 py-1 rounded-md text-white absolute top-5 right-5 text-xs'>{city}</span>
            <div className="card-body">
                <h2 className="card-title font-secondary font-extrabold mb-2">{name}</h2>
                <div className="card-actions justify-between">
                    <div className='flex items-center gap-1'>
                        <FaDollarSign />
                        <span>{rent_per_month}\mo</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaBed />
                        <span>{bedrooms}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaToriiGate />
                        <span>{bathrooms}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaExternalLinkAlt />
                        <span>{room_size}</span>
                    </div>
                </div>
                <div className='divider my-0'></div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <FaClock />
                        <span>{availability_date}</span>
                    </div>

                    <Link to='/' className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Book Now</span>
                    </Link>
                </div>
            </div>
        </div>

        // <div>
        //     <div className='relative'>
        //         <img  src={picture} alt={name} />
        //     </div>
        //     <span className='absolute top-5 right-5 z-10'>{city}</span>

        //     <span>{address}</span>

        //     <h2>{name}</h2>

        //     <div>
        //         <p>{rent_per_month}</p>
        //         <p>{bedrooms}</p>
        //         <p>{bathrooms}</p>
        //         <p>{room_size}</p>
        //     </div>

        //     <div>
        //         <p>{availability_date}</p>
        //         <button>book</button>
        //     </div>
        // </div>
    );
};

export default HouseCard;