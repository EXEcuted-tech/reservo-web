import React, {useState} from 'react';
import guykey from '../assets/usersign.png'
import background from '../assets/background-pattern.png'
import { FaEnvelope } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../common/config';
import GenSpinner from '../components/loaders/genSpinner';


const ForgetPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        setIsLoading(true)
        try {
            // Make a POST request to your backend API
            await axios.post(`${config.API}/forgetPassword/sendEmail`, { email }); // Replace '/api/reset-password' with your actual API endpoint
            console.log("Apples!");
            // Optionally, display a success message to the user
            alert('Reset email sent successfully');
        } catch (error) {
            // Handle errors (e.g., display an error message)
            console.error(error);
            alert('Error sending reset email');
        }
        setIsLoading(false);
    };

    return (
        <div className="font-poppins">
            <img className='absolute h-screen w-full' src={background} alt='background' />
            <div className='w-[53%] h-[65%] absolute -translate-x-2/4 -translate-y-2/4 flex items-center shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4'>
                <div className='w-[35%] h-full bg-[rgb(221,40,3)] flex flex-col p-[40px] pt-[70px] rounded-[7px_0px_0px_7px]'>
                    <img className='max-w-[40%] h-auto ml-[32%]' src={guykey} />
                    <div className='m-2.5 p-0 border-y-2 border-y-[white] border-solid  font-bold font-poppins'>
                        <h2 className='block text-[1.7em] m-[5.45%] text-[white] text-center '>Forgot<br />Password?</h2>
                    </div>
                    <p className='text-[white] text-center'>Enter your email address <br /> and retrieve your account.</p>
                    <div className='mt-[20px]'>
                        <p className='text-[white] text-[1.17em] font-bold text-center mt-8'>Already have an<br /> existing account?</p>
                        <button type="button" className='bg-[white] w-[80%] h-[50px] font-bold text-[rgb(221,40,3)] text-lg relative p-[1px] rounded-[30px] left-[30px] mt-[10px]'
                            onClick={() => { navigate('/uslogin') }}>Log In</button>
                    </div>
                </div>
                <div className='bg-[white] h-full pt-[120px] px-[70px] text-center rounded-[7px_7px_7px_7px]'>
                    <IoMdLock className='h-[100px] w-[120px] relative left-[21vh]' />
                    <h1 className='text-[30px] mt-[5px] mb-[15px] font-extrabold text-3xl'>Forgot Password?</h1>
                    <p className='text-center'>No worries! Enter your email, and we'll send a reset link to your inbox.</p>
                    <div className='flex items-center mt-[15px]'>
                        <FaEnvelope className='h-[20px] w-[20px]' />
                        <p className='ml-[5px]'>Email Address</p>
                    </div>

                    <input
                        type="email"
                        className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <>
                    {
                    isLoading? 
                    <GenSpinner/> : 
                    <button
                    type="submit"
                    className='bg-[rgb(221,40,3)] text-[white] w-[200px] float-right mt-[20px] p-1.5 rounded-[20px] text-xl font-extrabold'
                    onClick={handleResetPassword}
                    disabled = {isLoading}
                >
                    Reset Password
                </button>
                    }
                    </>
                    

                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;