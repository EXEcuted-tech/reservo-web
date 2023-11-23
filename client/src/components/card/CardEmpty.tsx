import React from 'react'
import colors from '../../common/colors'
import { FaIcons } from 'react-icons/fa'
import { AiFillDownCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../assets/css/card.css"
import { GoPlusCircle } from "react-icons/go";


interface CardEmpty {
    onClick: ()=>void;
}



const CardEmpty: React.FC<CardEmpty>=({onClick}) => {

    return (
        
        <div className='Card CardEmpty flex flex-wrap content-center mx-5 my-5 min-w-[18vw] max-w-[18vw] min-h-[50vh] max-h-[50vh] xs:max-sm:min-w-[40vw] xs:max-sm:max-w-[40vw] xs:max-sm:min-h-[35vh] xs:max-sm:max-h-[60vw]  
        hover:bg-[#FFFFFF] duration-500 cursor-pointer ' onClick={onClick}>
            <button className='w-[18vw] flex justify-center xs:max-sm:ml-[25%]'>
            <p className='text-5xl hover:bg-[#FFFFFF] rounded-full duration-500'><GoPlusCircle/></p>
            </button>
            </div>
    )
}

export default CardEmpty