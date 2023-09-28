import React from 'react'
import {Link} from 'react-router-dom'
import {RiReservedFill} from 'react-icons/ri'
import PeopleWaving from '../assets/wave.png'

const LogoutPage = () => {
  return (
    <div className='relative'>
      <div className='h-[10vh] w-full border-b-8 border-red-600'>
        <RiReservedFill className='fill-red-600 text-[80px] my-[10px] ml-[50px]' />
      </div>
      
      <div className='flex flex-row justify-even place-items-center bg-logout'>
        <div className='flex flex-col'>
            <h1 className='font-extrabold text-9xl ml-20 text-red-700'>You have been logged out.</h1>
            <span className='font-semibold text-4xl ml-20 mt-[50px]'>Thank you for using Reservo.<br/>To access the page, please log in again.</span>     
          <div className='flex'>
            <Link to={'/uslogin'} className='bg-red-700 rounded-full text-center text-white text-4xl font-semibold py-3 px-6 mt-7 ml-20 m-[1rem]'>Return to Login Page</Link>
          </div>
        </div>

        <div>
          <img src={PeopleWaving} alt="people-waving" className='w-[900px] mr-[500px]'/>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage