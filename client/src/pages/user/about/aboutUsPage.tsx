import React from 'react'
import background from '../../../assets/bgpic.jpg'
import {RiPhoneFill} from 'react-icons/ri'
import {RiBuilding4Fill} from 'react-icons/ri'
import {RiTimeFill} from 'react-icons/ri'

const AboutUsPage = () => {
  return (
    <div className='h-[80vh]'>
      <div className='font-poppins relative flex flex-row justify-between bg-black bg-opacity-40 h-[100%]'>
        <img src={background} alt='About Us Background' className='h-full w-full bg-[100%] object-cover bg-no-repreat bg-cover absolute z-100'/>
        <div className='h-full w-full bg-no-repreat bg-cover absolute z-999 bg-[rgba(0,0,0,0.45)]'/>
        <div className='w-4/5 px-40 py-20 z-0'>
          <div className='border-b-4 pb-6 '>
            <h1 className='font-extrabold text-white text-8xl pb-3'>Cater.</h1>
            <h1 className='font-extrabold text-white text-8xl pb-3'>Connect.</h1>
            <h1 className='font-extrabold text-white text-8xl pb-3'>Celebrate.</h1>
            <p className='italic text-white text-5xl'>Quisque sit amet elit tempor, pretium.</p>
          </div>
          <div className='pt-8'>
            <p className='text-white font-light text-justify text-2xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at sollicitudin lectus. Donec in lacinia erat, ut porttitor diam. Sed mauris nulla, lacinia sed placerat accumsan, viverra vel magna. Etiam vulputate lorem eget ligula vulputate dignissim. Curabitur molestie est sem, vel facilisis nunc lacinia quis. Fusce a nibh volutpat, congue turpis tempus, sollicitudin nulla.</p>
          </div>
        </div>

        <div className='bg-black bg-opacity-70 rounded-l-3xl py-[15%] px-[5vh] z-0 h-[60%] flex items-center self-center'>
          <table>
            <tbody>
              <tr>
                <td><RiPhoneFill className='text-white text-3xl'/></td>
                <td><h1 className='font-bold text-white text-3xl pl-4'>Contact Us</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4'>example@abc.com</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4'>+639478517200</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4'>(03)238-7156</h1></td>
              </tr>
              <tr>
                <td><RiBuilding4Fill className='text-white text-3xl mt-5'/></td>
                <td><h1 className='font-bold text-white text-3xl pl-4 mt-5'>Office Address</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4'>Nasipit, Talamban,</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4'>Cebu City, Philippines</h1></td>
              </tr>
              <tr>
                <td><RiTimeFill className='text-white text-3xl mt-5'/></td>
                <td><h1 className='font-bold text-white text-3xl pl-4 mt-5'>Opening Hours</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4'>Monday - Saturday</h1></td>
              </tr>
              <tr>
                <td></td>
                <td><h1 className='text-white text-lg pl-4'>8:30 AM - 4:30 PM</h1></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>

  )
}

export default AboutUsPage