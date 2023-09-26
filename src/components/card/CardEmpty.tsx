import React from 'react'
import colors from '../../common/colors'
import { FaIcons } from 'react-icons/fa'
import { AiFillDownCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../assets/css/card.css"
import { GoPlusCircle } from "react-icons/go";


interface prop {
    packageName: string;
    price: string;
    description: string;
}

const Card =() => {
    return (
        <div className='Card CardEmpty flex flex-wrap content-center mx-5 my-5 hover:bg-[#FFFFFF] duration-500 cursor-pointer'>
            <div className='w-[18vw] flex justify-center'>
            <button className='text-5xl hover:bg-[#FFFFFF] rounded-full duration-500'><GoPlusCircle/></button>
            </div>
            </div>
    )
}

export default Card