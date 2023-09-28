import React, { useState } from 'react'
import colors from '../../../common/colors'
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import background from '../../../assets/background-pattern.png';
import guykey from '../../../assets/usersign.png';


const SignupPage = () => {
  const [account_email, setaccount_email]= useState("");
  const [account_username, setaccount_username]= useState("");
  const [account_password, setaccount_password]= useState("");
  const [contact_number, setcontact_number]= useState("");
  const [account_type, setaccount_type]= useState(1);
  return (

    <div className='content-center overflow-hidden font-poppins'>
      {/* Background Picture */}
      <img className='absolute h-screen w-full' src={background} />
      <div className='absolute left-2/4 top-2/4 text-align w-[1000px] p-[10px] -translate-x-2/4 -translate-y-2/4'>
        {/* Left Box */}
        <div className='w-[35%] bg-[#DD2803] float-left text-center shadow-[12px_23px_10px_-4px_gray] pt-[70px] pb-[78px] px-10 rounded-[7px_0px_0px_7px]'>
          <img className='max-w-[40%] h-auto ml-[32%]' src={guykey} />
          {/* Welcome Sign */}
          <div className='m-2.5 p-0 border-y-2 border-y-[white] border-solid  font-bold font-poppins'>
            <h2 className='block text-[1.7em] m-[5.45%] text-[white]'>Sign Up to<br/> Reservo!</h2>
          </div>
          <p className='text-white'>Access more features by <br/>signing up now!</p>
          <div className='mt-[53px] font-bold font-poppins'>
            <h3 className=' mb-0 text-[1.17em] text-white'>Already have an</h3>
            <h3 className=' mb-2 text-[1.17em] text-white'>existing account?</h3>

            <a className='no-underline inline-block text-[#e72a2a] border text-lg relative cursor-pointer font-[bold] 
                          w-[190px] px-6 py-[11px] bg-white
                          rounded-[100px] border-solid border-white font-poppins font-bold'>
              Log In
            </a>
          </div>
        </div>
        {/* Right Box */}
        <div className='w-[65%] float-left bg-[white] shadow-[4px_15px_10px_4px_gray] pt-[38px] pb-[50px] px-[100px] rounded-[0px_7px_7px_0px]'>
          <h2 className='text-center text-[25px] font-bold font-poppins'>Create Your Account</h2>
          <div className='mt-2.5'>
            <BsFillPersonFill className='float-left text-[21px]'  />
            <label className='float-left ml-[2px]'>Username</label>
            <input type="username" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <div className='mt-2.5'>
            <MdEmail className='float-left text-[20px]'/>
            <label  className='float-left ml-[3px]'>Email</label>
            <input type="username" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          {/* //Halu */}
          <div className='mt-2.5'>
            <BsFillTelephoneFill className='float-left text-[17px]'/>
            <label className='float-left ml-[4px]'>Contact Number</label>
            <input type="username" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <div className='mt-2.5'>
            <BiSolidLockAlt className='float-left text-[19px]'/>
            <label className='float-left ml-[3px]'>Password</label>
            <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <div className='text-center mt-5'>
            <input type='submit' className='no-underline inline-block text-[white] border text-lg relative cursor-pointer
                                            shadow-[inset_0_0_0_white] w-[220px] px-6 py-[11px] rounded-[100px] border-solid 
                                            border-[#e72a2a] font-poppins font-bold bg-[#DD2803]' value='Sign Up'>
                                              
            </input>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignupPage