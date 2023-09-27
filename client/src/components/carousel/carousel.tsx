import React, { useState } from 'react';
import {Link } from "react-router-dom";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden h-[800px] w-[112.4rem] ">
      <div className="flex " >
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full h-3/4 ${
              index === currentSlide ? 'block' : 'hidden'
            }`}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-40 left-44 w-full p-4  bg-opacity-50">
              <h1 className="text-8xl md:text-2xl lg:text-8xl text-[#DD2803] font-bold">RESERVE A</h1>
              <h1 className="text-8xl mt-4 md:text-2xl lg:text-8xl text-[#DD2803] font-bold">SPOT EASILY,</h1>
              <h1 className="text-8xl mt-4 md:text-2xl lg:text-8xl text-[#DD2803] font-bold">SAVE YOUR TIME</h1>
              <h2 className="text-5xl md:text-2xl lg:text-5xl p-3 font-semibold text-white">YOUR CONVENIENCE, OUR PRIORITY</h2>
              <Link to="/">
              <button className="text-2xl p-5 mt-6 text-white bg-[#DD2803] hover:bg-[#A01B00] transition-colors delay-250 duration-[3000] ease-in">
                Reserve Online
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 space-x-2">
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 px-4 py-2 text-4xl opacity-70 text-white hover:text-gray-500 transition-colors delay-450 duration-[3000] ease-in-out"
        onClick={prevSlide}
      >
        <FiArrowLeft/>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 text-4xl opacity-70 text-white hover:text-gray-500 transition-colors delay-450 duration-[3000] ease-in-out" 
        onClick={nextSlide}
      >
        <FiArrowRight/>
      </button>
    </div>
  );
};

export default Carousel;
