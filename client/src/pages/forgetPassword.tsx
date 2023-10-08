import React from 'react';
import usersign from '../assets/usersign.png'
import background from '../assets/background-pattern.png'
import { FaEnvelope } from 'react-icons/fa';
import {IoMdLock} from 'react-icons/io'


const ForgetPassword = () => {
    return (
        <div className="font-poppins">
            <img className='absolute h-screen w-full' src={background} alt='background'/>
            <div className='w-[65.5%] h-[85%] absolute -translate-x-2/4 -translate-y-2/4 flex items-center shadow-[0_0_10px_black,0_0_15px_rgba(0,0,0,0.5)] rounded-[20px] left-2/4 top-2/4'>
                <div className='w-[48%] h-full bg-[rgb(221,40,3)] flex flex-col items-center p-[80px] rounded-tl-[20px] rounded-bl-[20px]'>
                    <img src={usersign} alt="User Sign" className='h-[110px] w-[110px] mt-[20px]' />
                    <h1 className='text-[white] font-[750] text-center text-4xl w-[95%] mt-2.5 mb-5 px-10 py-2.5 border-y-2 border-y-[white] border-solid'>Forgot Password</h1>
                    <p className='text-[white] text-center text-lg'>Enter your email address and retrieve your account.</p>
                    <div className='mt-[20px]'>
                        <p className='text-[white] font-bold text-3xl text-center mt-8'>Already have an existing account?</p>
                        <button type="button" className='bg-[white] w-[80%] h-[50px] text-[rgb(221,40,3)] text-3xl relative p-[1px] rounded-[30px] left-[30px] font-medium mt-[10px]'>Log In</button>
                    </div>
                </div>
                <div className='bg-[white] h-full pt-[120px] px-[70px] rounded-tr-[20px] rounded-br-[20px]'>
                    <IoMdLock className='h-[100px] w-[120px] relative left-[163px]'/>
                    <h1 className='text-[30px] text-center mt-[5px] mb-[15px] font-extrabold text-3xl'>Forgot Password?</h1>
                    <p className='text-center'>No worries! Enter your email, and we'll send a reset link to your inbox.</p>
                    <div className='flex items-center mt-[15px]'>
                        <FaEnvelope className='h-[30px] w-[30px]'/>
                        <p className='ml-[5px]'>Email Address</p>
                    </div>
                    <input type="email" name="" className="w-full bg-[#dfdfdf] h-10 rounded-[10px] mt-[5px] p-4" />
                    <button type="submit" className='bg-[rgb(221,40,3)] text-[white] w-[200px] float-right mt-[20px] p-1.5 rounded-[20px] text-xl font-extrabold'>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
