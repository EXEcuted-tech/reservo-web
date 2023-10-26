import React, { useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import firstslider from "../../assets/firstslider.png"
import secondslider from "../../assets/secondslider.png"
import thirdslider from "../../assets/thirdslider.png"

const images = [
  firstslider,
  secondslider,
  thirdslider
];

const Carousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden z-0 h-[900px] w-[118.87rem] xs:max-sm:w-screen xs:max-sm:h-[520px] xl:max-2xl:w-[100%] xl:max-2xl:h-[520px]">
      <div className="flex " >
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full h-3/4 ${
              index === currentSlide ? 'block' : 'hidden'
            }`}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="animate-fade-in w-full h-full object-cover" />
            <div className="absolute bottom-40 left-44 z-0 w-full px-4 py-7 xs:max-sm:left-0 xs:max-sm:bottom-20 xl:max-2xl:bottom-20">
              <h1 className="text-8xl text-[#DD2803] font-bold xs:max-sm:text-3xl xl:max-2xl:text-6xl ">RESERVE A</h1>
              <h1 className="text-8xl mt-4 text-[#DD2803] font-bold xs:max-sm:text-3xl xs:max-sm:mt-0 xl:max-2xl:text-6xl">SPOT EASILY,</h1>
              <h1 className="text-8xl mt-4 text-[#DD2803] font-bold xs:max-sm:text-3xl xs:max-sm:mt-0 xl:max-2xl:text-6xl">SAVE YOUR TIME</h1>
              <h1 className="text-5xl p-3 ml-[-1vh] font-semibold text-white xs:max-sm:text-2xl xs:max-sm:pt-0 xs:max-sm:pl-3 xl:max-2xl:text-3xl xl:max-2xl:ml-[-2vh]">YOUR CONVENIENCE,<br className='hidden xs:max-sm:block'/> OUR PRIORITY</h1>
              <Link to="/eaterychoice">
              <button className="text-2xl p-5 mt-6 text-white rounded-2xl bg-[#DD2803] hover:bg-[#A01B00] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.9rem] xs:max-sm:p-3 xl:max-2xl:text-[0.9rem] xl:max-2xl:p-3">
                Reserve Online
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-7 h-2 rounded bg-opacity-50 ${
              index === currentSlide ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 px-4 py-2 text-4xl opacity-70 text-black hover:text-gray-500 transition-colors delay-450 duration-[3000] ease-in-out xl:max-2xl:text-3xl"
        onClick={prevSlide}
      >
        <FiArrowLeft/>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 text-4xl opacity-70 text-white hover:text-gray-500 transition-colors delay-450 duration-[3000] ease-in-out xl:max-2xl:text-3xl" 
        onClick={nextSlide}
      >
        <FiArrowRight/>
      </button>
    </div>
  );
};

export default Carousel;
