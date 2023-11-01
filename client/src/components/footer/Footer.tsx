import React from 'react'
import {footerImg} from '../../assets/rectangle.png'
import {FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa'
import {AiOutlineCopyrightCircle} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="font-poppins flex items-center bg-footer text-white relative z-100 bg-[100%] bg-[red]">
        <div className='ml-[3%]'>
            <b className='font-extrabold text-[1.4em] xs:max-sm:text-[0.7em] xl:max-2xl:text-[1em]'>Contact Us</b>
            <p className='text-[1.1em] mt-[-3%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>+639175618159</p>
            <p className='text-[1.1em] mt-[-3%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>reservo-executed@gmail.com</p>
        </div>
        <div className='third ml-[5%]'>
            <b className='font-extrabold text-[1.4em] xs:max-sm:text-[0.7em] xl:max-2xl:text-[1em]'>Address</b>
            <p className='text-[1.1em] mt-[-3%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>Nasipit, Talamban,</p>
            <p className='text-[1.1em] mt-[-3%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>Cebu City, Philippines</p>
        </div>
        <div className='ml-[5%]'>
            <b className='font-extrabold text-[1.4em] xs:max-sm:text-[0.1em] xl:max-2xl:text-[1em]'>Opening Hours</b>
            <p className='text-[1.1em] mt-[-3%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>Mon - Fri 8:00 AM - 5:00 PM</p>
            <p className='text-[1.1em] mt-[-3%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>Sat - 8:00 AM - 5:00 PM</p>
        </div>

        <div className='flex items-center ml-[6%] mr-[6%]'>
            <FaTwitter className='text-[3em] mr-[15%] xs:max-sm:text-[0.7em] xl:max-2xl:text-[2em]'/>
            <FaFacebookF className='text-[2em] mr-[15%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[1em]'/>
            <FaInstagram className='text-[3em] mr-[10%] xs:max-sm:text-[0.4em] xl:max-2xl:text-[2em]'/>
        </div>
            
        <div>
            <p className='font-medium text-[1.2em] flex items-center xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em]'>Copyright <AiOutlineCopyrightCircle/> 2022 Derf's Grill and Resto. All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer