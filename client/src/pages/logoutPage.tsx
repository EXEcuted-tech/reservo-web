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
      FUCKING BULLSHIT
    </div>
  )
}

export default LogoutPage