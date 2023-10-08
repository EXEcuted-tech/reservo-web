<<<<<<< HEAD
import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/temp-logo-2.png'
import PeopleWaving from '../assets/wave.png'

const LogoutPage = () => {

  useEffect(() => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('admerchDetails');
  });

  return (
    <div className='animate-fade-in relative'>
      <div className='h-[10vh] w-full border-b-8 border-red-600'>
        <img className='max-w-[9%] h-auto ml-[7vh] mt-[1.5vh] pt-[10px]' src={logo}/>
      </div>
      
      <div className='flex flex-row justify-even place-items-center bg-logout'>
        <div className='flex flex-col'>
            <h1 className='font-extrabold text-9xl ml-20 text-red-700'>You have been logged out.</h1>
            <span className='font-semibold text-4xl ml-20 mt-[50px]'>Thank you for using Reservo.<br/>To access the page, please log in again.</span>     
          <div className='flex'>
            <Link to={'/uslogin'} className='bg-red-700 rounded-full text-center text-white text-3xl font-semibold py-3 px-6 mt-6 ml-20 m-[1rem] hover:bg-[#A01B00] transition-colors delay-250 duration-[3000] ease-in'>Return to Login Page</Link>
          </div>
        </div>

        <div>
          <img src={PeopleWaving} alt="people-waving" className='w-[900px] mr-[500px]'/>
        </div>
      </div>
    </div>
  )
}

=======
import React from 'react'

const LogoutPage = () => {
  return (
    <div>L</div>
  )
}

>>>>>>> 802eb6c58c81e931b06842bdf6bd99922a31a6dd
export default LogoutPage