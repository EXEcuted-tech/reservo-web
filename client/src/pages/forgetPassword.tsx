import React, { useEffect, useState } from 'react';
import guykey from '../assets/usersign.png'
import background from '../assets/background-pattern.png'
import { FaEnvelope } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../common/config';
import GenSpinner from '../components/loaders/genSpinner';
import Spinner from '@material-tailwind/react/components/Spinner';
import Danger from '../components/box/danger';


const ForgetPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userOTP,setUserOTP]= useState('')

    const [email, setEmail] = useState('');

    const [confirmMessage, setConfirmMessage] = useState(true);
    const [errMess,setErrMess]= useState('');
    const [countdown, setCountdown] = useState(300);

    const handleResetPassword = async () => {
        setIsLoading(true)
        try {
            // Make a POST request to your backend API
            await axios.post(`${config.API}/forgetPassword/sendEmail`, { email })
            .then((res)=>{
                if(res.status == 200){
                    setTimeout(()=>{setIsLoading(false);},800)
                    setConfirmMessage(false);
                }
            })
            // Optionally, display a success message to the user
            // alert('Reset email sent successfully');

        } catch (error) {
            // Handle errors (e.g., display an error message)
            console.error(error);
            alert('Error sending reset email');
        }

    };

    const confirmOTP = () => {
        setIsLoading(true)
        setErrMess('');
        try{
            axios.post(`${config.API}/forgetPassword/verifycode`, { email,userOTP })
            .then((res)=>{
                if(res.data.success == true){
                    alert("Code to be continued!");
                    window.location.reload(); //replace this to a page where they can change their password
                }else{
                    setErrMess('Incorrect OTP code!');
                }
            })
        }catch(err){
            console.log(err);
            setErrMess('Incorrect OTP code!');
        }
    }

    const backButton = () => {
        window.location.reload();
    }

    useEffect(() => {
        const countdownInterval = setInterval(() => {
          if (countdown > 0) {
            setCountdown(countdown - 1);
          } else {
            clearInterval(countdownInterval);
            // Handle countdown expiration
          }
        }, 1000);
    
        return () => {
          clearInterval(countdownInterval);
        };
      }, [countdown]);

    return (
        <div className="animate-fade-in font-poppins" id='confirmBox'>
            {errMess !='' && <Danger message={errMess}/>}
            <img className='absolute h-screen w-full' src={background} alt='background' />
            {confirmMessage ? (<div className='bg-white w-[53%] h-[65%] absolute -translate-x-2/4 -translate-y-2/4 flex items-center shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4 xs:max-sm:w-[80%] xs:max-sm:h-[38%] xl:max-2xl:w-[50%] xl:max-2xl:h-[68%]'>
                <div className='w-[35%] h-full bg-[rgb(221,40,3)] flex flex-col p-[40px] pt-[70px] rounded-[7px_0px_0px_7px] xs:max-sm:w-[40%] xs:max-sm:p-[10px] xs:max-sm:pt-[3rem] xl:max-2xl:w-[40%]'>
                    <img className='max-w-[40%] h-auto ml-[32%]' src={guykey} />
                    <div className='m-2.5 p-0 border-y-2 border-y-[white] border-solid font-bold font-poppins'>
                        <h2 className='block text-[1.7em] m-[5.45%] text-[white] text-center xs:max-sm:text-[0.9em] xl:max-2xl:text-[1.1em] '>Forgot<br />Password?</h2>
                    </div>
                    <p className='text-[white] text-center xs:max-sm:text-[0.3em] xl:max-2xl:text-[0.6em]'>Enter your email address <br /> and retrieve your account.</p>
                    <div className='mt-[20px]'>
                        <p className='text-[white] text-[1.17em] font-bold text-center mt-4 xs:max-sm:text-[0.4rem] xl:max-2xl:text-[0.7em]'>Already have an<br /> existing account?</p>
                        <button type="button" className='bg-[white] w-[80%] h-[50px] font-bold text-[rgb(221,40,3)] text-lg relative p-[1px] rounded-[30px] left-[30px] mt-[10px] 
                        hover:bg-[#9a1a00] hover:text-white transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.5em] xs:max-sm:left-[7px] xs:max-sm:h-[1rem] xl:max-2xl:text-[0.8em] xl:max-2xl:left-[15px] xl:max-2xl:h-[2rem]'
                            onClick={() => { navigate('/uslogin') }}>Log In</button>
                    </div>
                </div>
                <div className=' h-[80%] mt-[10%] px-[14%]  items-center justify-center text-center rounded-[7px_7px_7px_7px] xs:max-sm:mt-[3%] xs:max-sm:px-[7%] xl:max-2xl:mt-[5%]'>
                    <IoMdLock className='h-[100px] w-[120px] relative ml-[35%] xs:max-sm:h-[40px] xs:max-sm:w-[50px] xl:max-2xl:h-[70px] xl:max-2xl:w-[100px]' />
                    <h1 className='text-[30px] mt-[5px] mb-[15px] font-extrabold text-3xl xs:max-sm:text-sm xl:max-2xl:text-xl'>Forgot Your Password?</h1>
                    <p className='text-center xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>No worries! Enter your email, and we'll send </p>
                    <p className='text-center xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>a reset link to your inbox.</p>
                    <div className='flex items-center mt-[8%]'>
                        <FaEnvelope className='h-[20px] w-[20px] xs:max-sm:w-[7px] xl:max-2xl:w-[13px]' />
                        <p className='ml-[5px] xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>Email Address</p>
                    </div>

                    <input
                        type="email"
                        className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[7%] xs:max-sm:my-1 xl:max-2xl:h-[13%]'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <>
                        <button
                            type="submit"
                            className='flex justify-center bg-[rgb(221,40,3)] text-[white] w-[43%] float-right mt-[20px] p-1.5 rounded-[20px] text-l font-semibold 
                            hover:bg-[#9a1a00] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'
                            onClick={handleResetPassword}
                            disabled={isLoading}
                        >
                            {isLoading && <Spinner/>}  Reset Password
                        </button>
                    </>
                </div>
            </div>) : (<div className='bg-white w-[30%] h-[50%] absolute -translate-x-2/4 -translate-y-2/4 flex flex-col items-center justify-center shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4 p-20 text-center'>
                    <h1 className='text-5xl font-extrabold'>Email Sent!</h1><br/>
                    <h3 className='text-2xl'>A verification code is sent to your email address.</h3><br/><p>Please enter it below to reset your password.</p>
                    <input type="text" name="code" placeholder='Input OTP Code' onChange={(e)=>{setUserOTP(e.target.value)}} className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                    <div className="countdown-timer text-[1em] text-[#ccc]">
                         Time Left: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                     </div>
                    <button
                        type="submit"
                        className='bg-[rgb(221,40,3)] text-[white] w-[200px] float-right mt-[20px] p-1.5 rounded-[20px] text-xl font-extrabold'
                        onClick={confirmOTP}
                    >
                        Enter Code
                    </button>
                    <button
                        type="submit"
                        className='bg-[white] border-[rgb(221,40,3)] border-[3px] text-[rgb(221,40,3)] w-[200px] float-right mt-[10px] p-1.5 rounded-[20px] text-xl font-extrabold'
                        onClick={backButton}
                    >
                        Go back
                    </button>
                </div>
            )}

        </div>
    );
}

export default ForgetPassword;