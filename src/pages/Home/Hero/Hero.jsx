import React from 'react';
import { useQuery } from '@tanstack/react-query';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './sliders.css';

// import required modules
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
// import LoaderSpinner from '../../Shared/LoaderSpinner/LoaderSpinner';

const Hero = () => {

    const { data: sliders = [], isLoading } = useQuery({
        queryKey: ['sliders'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/sliders');
            return res.json();
        }
    });

    // if (isLoading) {
    //     return <LoaderSpinner />
    // }

    return (
        <div>
            <>
                <Swiper
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    effect={"fade"}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    slidesPerView={1}
                    loop={true}
                    modules={[EffectFade, Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        sliders.map((item, id) => <SwiperSlide
                            style={
                                {
                                    height: "100vh",
                                    borderRadius: "0",
                                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image}) no-repeat center / cover`
                                }
                            }
                            key={id}

                        >
                            <div>
                                <h1 className="text-white font-secondary font-extrabold uppercase text-sm md:text-4xl">{item.title}</h1>
                                <p className="w-3/4 md:w-full mx-auto font-tertiary font-medium text-xs md:text-base text-white my-3 md:my-5">{item.description}</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </>
        </div>
    );
};

export default Hero;