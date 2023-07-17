import React from 'react';

const HouseCard = ({ house }) => {

    const { picture, name, address, city, bedrooms, bathrooms, room_size, availability_date, rent_per_month } = house;

    return (

        <div className="card w-full mb-5 md:mb-0 md:w-96 bg-base-100 shadow-md">
            <figure><img className='relative' src={picture} alt="Shoes" /></figure>
            <span className='bg-black bg-opacity-30 p-3 rounded-full text-white absolute top-5 right-5 text-xl'><FaRegStar /></span>
            <div className="card-body">
                <h2 className="card-title font-secondary font-extrabold">{name}</h2>
                {/* <p>Instructor: {instructorName}</p>
                <div className='divider my-0'></div>
                <div className="card-actions justify-between">
                    <div className='flex items-center gap-2'>
                        <FaUserFriends className='text-[#F24080]' />
                        <span className='text-base'>{students}+ Students</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaRegMoneyBillAlt className='text-[#F24080]' />
                        <span className='text-base'>${price}</span>
                    </div>
                </div> */}
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