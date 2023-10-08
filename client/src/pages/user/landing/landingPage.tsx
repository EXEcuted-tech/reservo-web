import React from 'react'
import colors from '../../../common/colors.ts'

import img1 from "../../../assets/landing-1.png"
import book from "../../../assets/book.png"
import cursor from "../../../assets/cursor.png"
import icon from "../../../assets/icon.png"
import starleft from "../../../assets/starleft.png"
import starright from "../../../assets/starright.png"
import food1 from "../../../assets/food-1.png"
import food2 from "../../../assets/food-2.png"
import food3 from "../../../assets/food-3.png"

import {Link } from "react-router-dom";
import Carousel from '../../../components/carousel/carousel.tsx';
import Rating from '@mui/material/Rating';


const LandingPage = () => {
  return (
    
    <div className = "bg-[#F9F2EA] font-poppins animate-fade-in">

        {/* CAROUSEL */}
        <div className="container w-full h-full">
            <Carousel />
          </div>

      {/*SECTION*/}
        <div className = "block align-middle h-full px-60 py-32 ">

          <div className="pb-20 flex flex-col items-center justify-center">
            <img src={img1} alt="Landing Page Image 1" className="h-auto max-w-full mb-20 transform scale-100"></img>
            <h3 className = "text-5xl text-center font-bold text-[#DD2803]">COMMITTED TO MAKING THINGS</h3>
            <h3 className = "text-5xl text-center font-bold text-[#DD2803] pt-5 "> CONVENIENT SINCE 2022</h3>
          </div>
          

        {/* CARDS */}
        <div className="flex mb-20 ml-[3  %] drop-shadow-lg">
          <div className =" group h-80 w-1/4 ml-16 mt-10 mb-20 text-center bg-white hover:bg-[#ffd381] transition-colors duration-[3000] ease-in drop-shadow-lg">
                <img src={icon} alt="card-1 image" className="h-40 w-40 ml-[30%] transition-transform delay-450 duration-[3000] ease-in-out transform scale-100 group-hover:scale-110"></img>
                <h2 className=" text-2xl font-bold p-2 group-hover:text-[#DD2803] transition-colors delay-450 duration-[3000] ease-in-out transform scale-100 group-hover:scale-110 ">
                  SEARCH ON THE GO</h2>
                <p className=" text-xl p-2">Find up and coming restaurants using Reservo's robust searching system.</p>
            </div>  

            <div className ="group h-80 w-1/4 ml-28 mt-10 mb-20 text-center  bg-white hover:bg-[#ffd381] transition-colors duration-[3000] ease-in drop-shadow-lg">
              <img src={cursor} alt="card-2 image" className="h-40 w-40 ml-[30%] transition-transform delay-450 duration-[3000] ease-in-out transform scale-100 group-hover:scale-110"></img>
                <h2 className=" text-2xl font-bold p-2 group-hover:text-[#DD2803] transition-colors delay-450 duration-[3000] ease-in-out transform scale-100 group-hover:scale-110">
                  DECIDE AND SELECT</h2>
                <p className=" text-xl p-2">Browse through a variety of Cebu's top restaurants and enjoy a meal fit to your tastes.</p>
            </div> 

            <div className ="group h-80 w-1/4 ml-28 mt-10 mb-20 text-center  bg-white hover:bg-[#ffd381] transition-colors duration-[3000] ease-in drop-shadow-lg">
               <img src={book} alt="card-2 image" className="h-40 w-40 ml-[30%] transition-transform delay-450 duration-[3000] ease-in-out transform scale-100 group-hover:scale-110"></img>
                <h2 className=" text-2xl font-bold p-2 group-hover:text-[#DD2803] transition-colors delay-450 duration-[3000] ease-in-out transform scale-100 group-hover:scale-110">
                  VIEW AND BOOK</h2>
                <p className=" text-xl p-2">Reserve a spot at the best reviewed eateries and secure the best eating experience.</p>
            </div>  
        </div>

        {/* ALL TIME FAVORITES */}
        <div className= "bg-white p-3 drop-shadow-lg">
          <div className="flex justify-center">
            <img src={starleft} alt="star-1" className="h-12 w-15 mt-[1.2%]"></img>
            <h1 className = "text-5xl text-center font-bold p-5">ALL TIME FAVORITES</h1>
            <img src={starright} alt="star-2" className="h-12 w-15 mt-[1.2%]"></img>
          </div>
          

        {/* RESTOS */}
        <div className= "flex justify-center">
          <div className ="group h-full w-96 pt-12 mb-20">
              <img src={food1} className="rounded-full h-60 w-60 mb-8 ring-8 ml-16 ring-[#DD2803] ring-offset-8 group-hover:ring-4 group-hover:scale-95 transition-transform duration-[1000] ease-in-out "></img>
                <h2 className="text-3xl text-center font-bold p-3 group-hover:text-[#DD2803] transition-colors delay-450 duration-[3000] ease-in-out"> Derf's Grill and Resto</h2>
                <div className="flex p-3 items-center justify-center">
                   <Rating defaultValue={4} readOnly></Rating>
                </div>
            </div>

            <div className ="group h-full w-96 ml-[6%] pt-12 mb-20">
              <img src={food3} className="rounded-full h-60 w-60 mb-8 ring-8 ml-16 ring-[#DD2803] ring-offset-8 group-hover:ring-4 group-hover:scale-95 transition-transform duration-[1000] ease-in-out"></img>
                <h2 className="text-3xl text-center font-bold p-3 group-hover:text-[#DD2803] transition-colors delay-450 duration-[3000] ease-in-out"> Kuzina D' Aiman</h2>
                <div className="flex p-3 items-center justify-center">
                <Rating defaultValue={4} readOnly></Rating>
                </div>
            </div>

            <div className ="group h-full w-96 ml-[6%] pt-12 mb-20">
              <img src={food2} className="rounded-full h-60 w-60 mb-8 ring-8 ml-16 ring-[#DD2803] ring-offset-8 group-hover:ring-4 group-hover:scale-95 transition-transform duration-[1000] ease-in-out"></img>
                <h2 className="text-3xl text-center font-bold p-3 group-hover:text-[#DD2803] transition-colors delay-450 duration-[3000] ease-in-out"> J & J Lechon Belly</h2>
                <div className="flex p-3 items-center justify-center">
                <Rating defaultValue={4} readOnly></Rating>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center">
          <Link to="/eaterychoice">
          <button className= " text-2xl p-5 mb-10 rounded-2xl text-white bg-[#DD2803] hover:bg-[#A01B00] transition-colors delay-250 duration-[3000] ease-in">View Eatery Choices</button>
          </Link>
        </div>
        </div>
        </div>
    </div>
    


  );
}

export default LandingPage