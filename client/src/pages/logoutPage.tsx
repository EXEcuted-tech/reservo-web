import React from 'react'
import Background from '../assets/background-pattern.png'
import {RiReservedFill} from 'react-icons/ri'
import PeopleWaving from '../assets/wave.png'

// module.exports = {
//   theme: {
//     extend: {
//       backgroundImage: {
//         'bg-image': "url('../assets/background-pattern.png')",
//       }
//     }
//   }
// };

const LogoutPage = () => {
  return (
    <div className='relative'>
      <div className='h-[10vh] w-full border-b-8 border-red-600'>
        <RiReservedFill className='fill-red-600 text-[80px] my-[10px] ml-[50px]' />
      </div>
      {/* <img src={Background} alt='wavy-pattern' className='object-cover h-[88vh] w-full absolute mix-blend-overlay bg-no-repeat' /> */}
      
      <div className='flex flex-row justify-even pt-20 place-items-center bg-[url("../assets/background-pattern.png")]'>
        <div>
          <h1 className='font-extrabold text-9xl ml-20 text-red-700'>You have been logged out.</h1>
          <p className='font-semibold text-4xl ml-20 mt-[50px]'>Thank you for using Reservo.<br/> To access the page, please log in again.</p>
          <a href='/uslogin'>
            <button className='bg-red-700 rounded-full text-white text-4xl font-semibold py-3 px-6 mt-7 ml-20'>
              Return to Login Page
            </button>
          </a>
        </div>

        <div>
          <img src={PeopleWaving} alt="people-waving" className='w-[900px] mr-[500px]'/>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage