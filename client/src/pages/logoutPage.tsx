import React from 'react'
import Background from '../assets/background-pattern.png'
import {RiReservedFill} from 'react-icons/ri'

const LogoutPage = () => {
  return (
    <div className='relative'>
      <div className='h-[10vh] w-full border-b-8 border-red-600'>
        <RiReservedFill className='fill-red-600 text-[80px] my-[10px] ml-[50px]' />
      </div>
      <img src={Background} alt='wavy-pattern' className='object-cover h-[88vh] w-full absolute mix-blend-overlay bg-no-repeat' />
      
      <div className='flex justify-around'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iste nemo aperiam fugiat ullam tenetur accusamus quis doloremque eveniet atque quod animi vero expedita voluptatum eius, rem provident corrupti harum.</p>
        <p>dasdas</p>
      </div>

      {/* <div>
        RIGHT
      </div> */}

    </div>
  )
}

export default LogoutPage