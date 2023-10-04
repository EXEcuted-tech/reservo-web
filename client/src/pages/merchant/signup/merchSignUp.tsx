import React, { FormEvent, useEffect } from 'react'
import colors from '../../../common/colors'
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsBriefcaseFill, BsPersonAdd, BsFillImageFill, BsFillPersonVcardFill } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import background from '../../../assets/background-pattern.png';
import guykey from '../../../assets/usersign.png';
import axios from 'axios';

const MerchSignUp = () => {
  const [username,setUsername] = ("");
  const [business,setBusiness] = ("");
  const [position,setPosition] = ("");
  const [email,setEmail] = ("");

  //store accounts
  //match business name and account
  //store in merchant account field
  useEffect(() => {
    
  }, []);

  const merchSignUp = (event: FormEvent) =>{
    event.preventDefault();

    axois.post(`${config.API}/merchant/create`)
  }

  return (
    <div className=''>
      <div className='content-center overflow-hidden font-poppins'>
        {/* Background Picture */}
        <img className='absolute h-screen w-full' src={background} />
        <div className='absolute left-2/4 top-2/4 text-align w-[1000px] p-[10px] -translate-x-2/4 -translate-y-2/4'>
          {/* Left Box */}
          <div className='w-[34%] bg-white float-left text-center shadow-[8px_23px_10px_-4px_gray] pt-[70px] pb-[78px] px-10 rounded-[7px_0px_0px_7px]'>
            <img className='max-w-[40%] h-auto ml-[32%]' src={guykey} />
            {/* Welcome Sign */}
            <div className='m-2.5 p-0 border-y-2 border-y-[#840705] border-solid font-poppins font-bold'>
              <h2 className='block text-[1.7em] m-[5.45%] text-[black] font-poppins'>Sign Up to </h2>
              <h2 className='block text-[1.7em] mt-[-13px] m-[5.45%] text-[#840705] text-bold'>Reservo!</h2>
            </div>  
            <p className='text-[#840705]'>Access more features by <br/>signing up now!</p>
            <div className='font-poppins font-bold  mt-[56px]'>
              <h3 className=' mb-0 text-[1.17em] text-[black] font-poppins'>Already have an</h3>
              <h3 className=' mb-2 text-[1.17em] text-[black] font-poppins'>existing account?</h3>

              <a className='no-underline inline-block text-[white] border text-lg relative cursor-pointer font-[bold] 
                            w-[190px] px-6 py-[11px] bg-[#840705]
                            rounded-[100px] border-solid border-white font-poppins font-bold'>
                Log In
              </a>
            </div>
          </div>
          {/* Right Box */}
          <div className='w-[65%] flex flex-col bg-[#840705] shadow-[4px_15px_10px_4px_gray] pt-[38px] pb-[50px] px-[30px] rounded-[0px_7px_7px_0px]'>
            <h2 className='text-center text-[25px] text-[white] font-poppins font-bold'>Create Your Account</h2>
            <div className='w-[100%]'>
              <div className='w-[45%] float-left text-[white]'>
                <div className='mt-2.5'>
                  <BsFillPersonFill className='float-left text-[21px]'  />
                  <label className='float-left ml-[2px]'>Username</label>
                  <input type="username" className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                </div>
                <div className='mt-2.5'>
                  <BsBriefcaseFill className='float-left ml-[2px] text-[18px]'/>
                  <label  className='float-left ml-[4px]'>Business Name</label>
                  <input type="text" className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                </div>
                <div className='mt-2.5'>
                  <BsFillPersonVcardFill className='float-left text-[19px]'/>
                  <label className='float-left ml-[4px]'>Position</label>
                  <input type="text" className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                </div>
                <div className='mt-2.5'>
                  <BsPersonAdd className='float-left text-[21px]'/>
                  <label className='float-left ml-[4px]'>Proof of Employment</label>
                  
                  <label className='flex cursor-pointer mt-2.5 ml-7 bg-white hover:bg-[#840705] hover:text-white text-white text-centerpy-2 px-4 rounded-lg shadow-md float-left align-middle w-[75%] '>
                    <BsFillImageFill className='float-left text-[50px] mr-[10px] text-[#840705] hover:text-white ml-2'/>
                    <input type="file" id="fileInput" accept="image/*" className='float-left cursor-pointer hover:text-white  mt-[13px] text-[#840705] inline-block border-solid border-[#ccc] file:hidden'></input>
                  </label>
                </div>
              
              </div>
              <div className='w-[45%] float-left ml-[40px] text-[white]'>
                <div className='mt-2.5'>
                  <MdEmail className='float-left text-[21px]'  />
                  <label className='float-left ml-[2px]'>Email</label>
                  <input type="email" className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                </div>
                <div className='mt-2.5'>
                  <BsFillTelephoneFill className='float-left text-[20px]'/>
                  <label  className='float-left ml-[3px]'>Contact Number</label>
                  <input type="text" className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                </div>
                {/* //Halu */}
                <div className='mt-2.5'>
                  <BiSolidLockAlt className='float-left text-[19px]'/>
                  <label className='float-left ml-[4px]'>Password</label>
                  <input type="password" className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                </div>
                <div className='mt-2.5'>
                  <BiSolidLockAlt className='float-left text-[19px]'/>
                  <label className='float-left ml-[3px]'>Confirm Password</label>
                  <input type="password" className='w-full text-[black] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
                </div>
              
              </div>
            </div>
            <div className='text-center mt-5'>
              <input type='submit' className='no-underline inline-block text-[#840705] border text-lg relative cursor-pointer
                                                shadow-[inset_0_0_0_white] w-[220px] px-6 py-[11px] rounded-[100px] border-solid 
                                                border-[#e72a2a] font-poppins font-bold bg-[white]' value='Sign Up'>
                                                  
              </input>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default MerchSignUp

