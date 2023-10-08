import React from 'react'
import {footerImg} from '../../assets/rectangle.png'
import {FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa'
import {AiOutlineCopyrightCircle} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="flex items-center bg-footer text-white">
        <div className='ml-[3%]'>
            <b className='font-extrabold text-[1.4em]'>Contact Us</b>
            <p className='text-[1.1em] mt-[-3%]'>+639175618159</p>
            <p className='text-[1.1em] mt-[-3%]'>reservo-executed@gmail.com</p>
        </div>
        <div className='ml-[5%]'>
            <b className='font-extrabold text-[1.4em]'>Address</b>
            <p className='text-[1.1em] mt-[-3%]'>Nasipit, Talamban,</p>
            <p className='text-[1.1em] mt-[-3%]'>Cebu City, Philippines</p>
        </div>
        <div className='ml-[5%]'>
            <b className='font-extrabold text-[1.4em]'>Opening Hours</b>
            <p className='text-[1.1em] mt-[-3%]'>Mon - Fri 8:00 AM - 5:00 PM</p>
            <p className='text-[1.1em] mt-[-3%]'>Sat - 8:00 AM - 5:00 PM</p>
        </div>

        <div className='flex items-center ml-[6%] mr-[6%]'>
            <FaTwitter className='text-[3em] mr-[15%]'/>
            <FaFacebookF className='text-[2em] mr-[15%]'/>
            <FaInstagram className='text-[3em] mr-[10%]'/>
        </div>
            
        <div>
            <p className='font-medium text-[1.2em] flex items-center'>Copyright <AiOutlineCopyrightCircle/> 2022 Derf's Grill and Resto. All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer