<<<<<<< HEAD
import React from 'react';
import guykey from '../assets/usersign.png'
import background from '../assets/background-pattern.png'
import { FaEnvelope } from 'react-icons/fa';
import {IoMdLock} from 'react-icons/io'
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
    const navigate = useNavigate();
    return (
        <div className="animate-fade-in font-poppins">
            <img className='absolute h-screen w-full' src={background} alt='background'/>
            <div className='w-[53%] h-[65%] absolute -translate-x-2/4 -translate-y-2/4 flex items-center shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4'>
                <div className='w-[35%] h-full bg-[rgb(221,40,3)] flex flex-col p-[40px] pt-[70px] rounded-[7px_0px_0px_7px]'>
                    <img className='max-w-[40%] h-auto ml-[32%]' src={guykey} />
                    <div className='m-2.5 p-0 border-y-2 border-y-[white] border-solid  font-bold font-poppins'>
                        <h2 className='block text-[1.7em] m-[5.45%] text-[white] text-center '>Forgot<br/>Password?</h2>
                    </div>
                    <p className='text-[white] text-center'>Enter your email address <br/> and retrieve your account.</p>
                    <div className='mt-[20px]'>
                        <p className='text-[white] text-[1.17em] font-bold text-center mt-8'>Already have an<br/> existing account?</p>
                        <button type="button" className='bg-[white] w-[80%] h-[50px] font-bold text-[rgb(221,40,3)] text-lg relative p-[1px] rounded-[30px] left-[30px] mt-[10px] hover:bg-[#9a1a00] hover:text-white transition-colors delay-250 duration-[3000] ease-in'
                        onClick={()=>{navigate('/uslogin')}}>Log In</button>
                    </div>
                </div>
                <div className='bg-[white] h-full pt-[120px] px-[70px] text-center rounded-[7px_7px_7px_7px]'>
                    <IoMdLock className='h-[100px] w-[120px] relative left-[21vh]'/>
                    <h1 className='text-[30px] mt-[5px] mb-[15px] font-extrabold text-3xl'>Forgot Password?</h1>
                    <p className='text-center'>No worries! Enter your email, and we'll send a reset link to your inbox.</p>
                    <div className='flex items-center mt-[15px]'>
                        <FaEnvelope className='h-[20px] w-[20px]'/>
                        <p className='ml-[5px]'>Email Address</p>
                    </div>
                    <input type="email" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'/>
                    <button type="submit" className='bg-[rgb(221,40,3)] text-[white] w-[200px] float-right mt-[20px] p-1.5 rounded-[20px] text-lg font-extrabold hover:bg-[#9a1a00] transition-colors delay-250 duration-[3000] ease-in'>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
=======
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
>>>>>>> 802eb6c58c81e931b06842bdf6bd99922a31a6dd
