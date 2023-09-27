import React from 'react'
import colors from '../../../common/colors'
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import background from '../../../assets/background-pattern.png';
import guykey from '../../../assets/usersign.png';
import "../../../assets/css/user-signup.css"

const MerchSignUp = () => {
  return (

    <div className='content-center overflow-hidden font-poppins'>
      {/* Background Picture */}
      <img className='absolute h-screen w-full' src={background} />
      <div className='absolute left-2/4 top-2/4 text-align w-[1000px] p-[10px] -translate-x-2/4 -translate-y-2/4'>
        {/* Left Box */}
        <div className='w-[34%] bg-white float-left text-center shadow-[12px_23px_10px_-4px_gray] pt-[70px] pb-[78px] px-10 rounded-[7px_0px_0px_7px]'>
          <img className='max-w-[40%] h-auto ml-[32%]' src={guykey} />
          {/* Welcome Sign */}
          <div className='m-2.5 p-0 border-y-2 border-y-[#840705] border-solid'>
            <h2 className='block text-[1.7em] m-[5.45%] text-[black]  text-bold'>Sign Up to </h2>
            <h2 className='block text-[1.7em] mt-[-13px] m-[5.45%] text-[#840705] text-bold'>Reservo!</h2>
          </div>
          <p className='text-[#840705]'>Access more features by <br/>signing up now!</p>
          <div className='font-poppins mt-[53px]'>
            <h3 className=' mb-0 font-[bold] text-[1.17em] text-[black] font-poppins'>Already have an</h3>
            <h3 className=' mb-2 font-[bold] text-[1.17em] text-[black] font-poppins'>existing account?</h3>

            <a className='no-underline inline-block text-[white] border text-lg relative cursor-pointer font-[bold] 
                          w-[190px] px-6 py-[11px] bg-[#840705]
                          rounded-[100px] border-solid border-white font-poppins font-bold'>
              Log In
            </a>
          </div>
        </div>
        {/* Right Box */}
        <div className='w-[65%] float-left bg-[#840705] shadow-[4px_15px_10px_4px_gray] pt-[38px] pb-[50px] px-[30px] rounded-[0px_7px_7px_0px]'>
          <h2 className='text-center text-[25px] text-[white]'>Create Your Account</h2>
          <div className='mt-2.5 float-left mr-5'>
            <BsFillPersonFill className='float-left text-[21px] text-[white]'  />
            <label className='float-left ml-[2px] text-[white]'>Username</label><br/>
            <input type="username" className='float-left w-[27vh] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <div className='mt-2.5 float-left'>
            <MdEmail className='float-left text-[20px] text-[white]'/>
            <label  className='float-left ml-[5px] text-[white]'>Email</label><br/>
            <input type="username" className='float-left w-[27vh] inline-block rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <br/><br/><br/><br/><br/>
          {/* //Halu */}
          <div className='float-left w-[1200px]'>
            <BsFillPersonFill className='float-left text-[21px] text-[white]'  />
            <label className='float-left ml-[2px] mr-[50px] text-[white]'>Username</label><br/>
            <input type="username" className='float-left w-[27vh] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <div className='float-left'>
            <MdEmail className='float-left text-[20px] text-[white]'/>
            <label  className='float-left ml-[5px] text-[white]'>Email</label>
            <input type="username" className='float-left w-[27vh] inline-block rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <br/><br/><br/><br/><br/>

          <div className='mt-2.5 float-left mr-5'>
            <BsFillPersonFill className='float-left text-[21px] text-[white]'  />
            <label className='float-left ml-[2px] text-[white]'>Username</label><br/>
            <input type="username" className='float-left w-[27vh] inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <div className='mt-2.5 float-left'>
            <MdEmail className='float-left text-[20px] text-[white]'/>
            <label  className='float-left ml-[5px] text-[white]'>Email</label><br/>
            <input type="username" className='float-left w-[27vh] inline-block rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]'></input>
          </div>
          <br/><br/><br/><br/><br/>
          
          {/* <div className='text-center mt-5'>
            <input type='submit' className='no-underline inline-block text-[#840705] border text-lg relative cursor-pointer
                                            shadow-[inset_0_0_0_white] w-[220px] px-6 py-[11px] rounded-[100px] border-solid 
                                            border-[#e72a2a] font-poppins font-bold bg-[white]' value='Sign Up'>
                                              
            </input>
          </div> */}
        </div>

      </div>
    </div>
  )
}

export default MerchSignUp