import React from 'react';
import usersign from '../forgetpassword/usersign.png';
import background from '../forgetpassword/background-pattern.png'
import {BiLock, BiEnvelope} from 'react-icons/bi'

const ForgetPassword = () => {
    return (
        <div className="font-poppins">
            <img className='absolute h-screen w-full' src={background} />
            <div className='w-[55%] h-4/5 absolute -translate-x-2/4 -translate-y-2/4 flex items-center shadow-[0_0_10px_black,0_0_15px_rgba(0,0,0,0.5)] rounded-[20px] left-2/4 top-2/4'>
                <div className='w-[45%] h-full bg-[rgb(221,40,3)] flex flex-col items-center p-[45px] rounded-tl-[20px] rounded-bl-[20px]'>
                    <img src={usersign} alt="User Sign" className='h-[125px] w-[125px]' />
                    <h1 className='text-[white] font-[750] text-center text-3xl w-[95%] mt-2.5 mb-5 px-10 py-2.5 border-y-2 border-y-[white] border-solid'>Forget Password</h1>
                    <p className='text-[white] text-center text-lg'>Enter your email address and retrieve your account.</p>
                    <div className='mt-[25px]'>
                        <p className='text-[white] font-medium text-xl text-center'>Already have a existing account?</p>
                        <button type="button" className='bg-[white] w-9/12 text-[rgb(221,40,3)] font-[750] text-xl relative p-[5px] rounded-[30px] left-[30px]'>Log In</button>
                    </div>
                </div>
                <div className='bg-[white] h-full pt-[120px] px-[70px] rounded-tr-[20px] rounded-br-[20px]'>
                    {/* <img src={padlock} alt="Padlock" className='h-[100px] w-[120px] relative left-[140px]' /> */}
                    <BiLock className='h-[100px] w-[120px] relative left-[140px]'/>
                    <h1 className='text-[25px] text-center mt-[5px] mb-[15px]'>Forget Password?</h1>
                    <p className='text-center'>No worries! Enter your email, and we'll send a reset link to your inbox.</p>
                    <div className='flex items-center mt-[15px]'>
                        {/* <img src={email} alt="" className='h-[30px] w-[30px]' /> */}
                        <BiEnvelope className='h-[30px] w-[30px]'/>
                        <p>Email Address</p>
                    </div>
                    <input type="email" name="" className="w-full bg-[lightgray] h-10 rounded-[10px]" />
                    <button type="submit" className='bg-[rgb(221,40,3)] text-[white] font-[bold] w-[180px] float-right mt-2.5 p-2.5 rounded-[20px]'>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
