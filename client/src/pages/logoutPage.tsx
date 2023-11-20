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
      <div className='h-[10vh] w-full border-b-8 border-red-600 xs:max-sm:border-b-[2.75px] xs:max-sm:h-[5vh] xl:max-2xl:border-b-[5.5px]'>
        <img className='max-w-[9%] h-auto ml-[7vh] mt-[1.5vh] pt-[10px] xs:max-sm:max-w-[20%] xs:max-sm:pt-[0.75vh] xs:max-sm:ml-[3vh]' src={logo}/>
      </div>
      
      <div className='flex flex-row justify-even place-items-center bg-logout'>
        <div className='flex flex-col xs:max-sm:w-full xs:max-sm:text-center mr-[7%]'>
            <h1 className='font-extrabold text-9xl ml-20 text-red-700 xs:max-sm:text-[2rem] xs:max-sm:ml-10 xl:max-2xl:text-[5.5rem]'>
              You have been logged out.</h1>
            <span className='font-semibold text-4xl ml-20 mt-[50px] xs:max-sm:text-sm xs:max-sm:mt-[15px] xs:max-sm:ml-10 xl:max-2xl:text-xl xl:max-2xl:mt-[30px]'>
              Thank you for using Reservo.<br/>To access the page, please log in again.</span>     
          <div className='flex'>
            <Link to={'/uslogin'} className='bg-red-700 rounded-full text-center text-white text-3xl font-semibold py-3 px-6 mt-6 ml-20 m-[1rem] 
            hover:bg-[#A01B00] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-sm xs:max-sm:ml-[30%] xs:max-sm:py-2 xl:max-2xl:text-xl'>
              Return to Login Page</Link>
          </div>
        </div>

        <div className="xs:max-sm:fixed xs:max-sm:top-[15%] xs:max-sm:left-[13%]">
          <img src={PeopleWaving} alt="people-waving" className='w-[900px] mr-[500px] xs:max-sm:w-[300px] xl:max-2xl:w-[600px] xl:max-2xl:mr-[300px]'/>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage