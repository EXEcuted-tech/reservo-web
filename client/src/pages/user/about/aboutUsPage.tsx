import React from 'react'
import background from '../../../assets/bgpic.jpg'
import {RiPhoneFill} from 'react-icons/ri'
import {RiBuilding4Fill} from 'react-icons/ri'
import {RiTimeFill} from 'react-icons/ri'

const AboutUsPage = () => {
  return (
    <div className='h-[80vh] bg-[#F9F2EA] animate-fade-in xs:max-sm:h-[100vh] xl:max-2xl:h-[76vh]'>
      <div className='font-poppins relative flex flex-row justify-between bg-black bg-opacity-40 z-10 h-[100%] w-[100%] xs:max-sm:bg-[#F9F2EA]'>
        <img src={background} alt='About Us Background' className='h-full w-full bg-[100%] object-cover bg-no-repreat bg-cover absolute z-100 xs:max-sm:h-[50%]'/>
        <div className='h-full w-full bg-no-repreat bg-cover absolute z-999 z-1 bg-[rgba(0,0,0,0.45)] xs:max-sm:h-[50%]'/>
        <div className='w-4/5 px-32 py-24 z-0 xs:max-sm:px-10 xs:max-sm:pr-5 xs:max-sm:py-9 xs:max-sm:inline-block xs:max-sm:h-1/5 xs:max-sm:w-[100%]  xl:max-2xl:px-16 xl:max-2xl:py-8'>
          <div className='border-b-4 pb-6 xs:max-sm:pb-3 xl:max-2xl:border-b-2'>
            <h1 className='font-extrabold text-white text-8xl pb-3 xs:max-sm:pb-0 xs:max-sm:text-3xl xl:max-2xl:text-6xl'>Choose.</h1>
            <h1 className='font-extrabold text-white text-8xl pb-3 xs:max-sm:pb-0 xs:max-sm:text-3xl xl:max-2xl:text-6xl'>Connect.</h1>
            <h1 className='font-extrabold text-white text-8xl pb-3 xs:max-sm:pb-0 xs:max-sm:text-3xl xl:max-2xl:text-6xl'>Celebrate.</h1>
            <p className='italic text-white text-5xl xs:max-sm:text-2xl xl:max-2xl:text-3xl'>With Reservo, everything becomes instant.</p>
          </div>
          <div className='pt-8 xs:max-sm:pt-5 xl:max-2xl:pt-4'>
            <p className='text-white font-light text-justify text-2xl xs:max-sm:text-[0.9em] xs:max-sm:leading-[1.5] xl:max-2xl:text-[0.9em]'>
Reservo, developed by the Cebu-based team EXEcuted, consists of talented BSIT students determined to further their expertise in the IT field through their collaborative efforts. In line with that, the team decided to make a centralized reservation management system for the benefit of both the customers and food businesses.</p>
          </div>

          {/* For Mobile Responsiveness */}
            <div className='bg-black bg-opacity-70 rounded-l-3xl mt-[5vh] rounded-r-3xl ml-[4vh] py-[15%] px-[5vh] z-0 h-[60%] flex items-center self-center hidden xs:max-sm:block xs:max-sm:inline-block xs:max-sm:h-[40vh] xs:max-sm:px-3 xs:max-sm:py-[7%]'>
            <table>
              <tbody>
                <tr>
                  <td><RiPhoneFill className='text-white text-3xl xs:max-sm:text-2xl xl:max-2xl:text-xl'/></td>
                  <td><h1 className='font-bold text-white text-3xl pl-4 xs:max-sm:text-2xl xl:max-2xl:text-lg'>Contact Us</h1></td>
                </tr>
                <tr>
                  <td></td>
                  <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>EXEcuted@abc.com</h1></td>
                </tr>
                <tr>
                  <td></td>
                  <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>+639478517200</h1></td>
                </tr>
                <tr>
                  <td></td>
                  <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>(03)238-7156</h1></td>
                </tr>
                <tr>
                  <td><RiBuilding4Fill className='text-white text-3xl mt-5 xs:max-sm:text-2xl xl:max-2xl:text-xl'/></td>
                  <td><h1 className='font-bold text-white text-3xl pl-4 mt-5 xs:max-sm:text-2xl xl:max-2xl:text-lg'>Office Address</h1></td>
                </tr>
                <tr>
                  <td></td>
                  <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>Nasipit, Talamban,</h1></td>
                </tr>
                <tr>
                  <td></td>
                  <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>Cebu City, Philippines</h1></td>
                </tr>
                <tr>
                  <td><RiTimeFill className='text-white text-3xl mt-5 xs:max-sm:text-2xl xl:max-2xl:text-xl'/></td>
                  <td><h1 className='font-bold text-white text-3xl pl-4 mt-5 xs:max-sm:text-2xl xl:max-2xl:text-lg'>Opening Hours</h1></td>
                </tr>
                <tr>
                  <td></td>
                  <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>Monday - Saturday</h1></td>
                </tr>
                <tr>
                  <td></td>
                  <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>8:30 AM - 4:30 PM</h1></td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>

        <div className='bg-black bg-opacity-70 rounded-l-3xl py-[15%] px-[5vh] z-0 h-[60%] flex items-center self-center xs:max-sm:hidden xs:max-sm:inline-block xs:max-sm:h-[500px] xs:max-sm:px-3 xs:max-sm:py-[7%]'>
          <table>
            <tbody>
              <tr>
                <td><RiPhoneFill className='text-white text-3xl xs:max-sm:text-2xl xl:max-2xl:text-xl'/></td>
                <td><h1 className='font-bold text-white text-3xl pl-4 xs:max-sm:text-2xl xl:max-2xl:text-lg'>Contact Us</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>EXEcuted@abc.com</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>+639478517200</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>(03)238-7156</h1></td>
              </tr>
              <tr>
                <td><RiBuilding4Fill className='text-white text-3xl mt-5 xs:max-sm:text-2xl xl:max-2xl:text-xl'/></td>
                <td><h1 className='font-bold text-white text-3xl pl-4 mt-5 xs:max-sm:text-2xl xl:max-2xl:text-lg'>Office Address</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>Nasipit, Talamban,</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>Cebu City, Philippines</h1></td>
              </tr>
              <tr>
                <td><RiTimeFill className='text-white text-3xl mt-5 xs:max-sm:text-2xl xl:max-2xl:text-xl'/></td>
                <td><h1 className='font-bold text-white text-3xl pl-4 mt-5 xs:max-sm:text-2xl xl:max-2xl:text-lg'>Opening Hours</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>Monday - Saturday</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4 xs:max-sm:text-sm xl:max-2xl:text-sm'>8:30 AM - 4:30 PM</h1></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>

  )
}

export default AboutUsPage