import React, { FormEvent,useState } from 'react'

import background from '../../../assets/background-pattern.png'

import { RiReservedFill } from 'react-icons/ri'; 
import { Link, useNavigate } from 'react-router-dom';



const UserLogin = () => {

    const [invalid , setInvalid] = useState(false);
    const [uName , setUser] = useState('');
    const [pass , setPass] = useState('');
    const Navigate = useNavigate();

    const guestHandler = () =>{
        Navigate('/');
    }

    const submitHandler = (event:FormEvent) =>{
        event.preventDefault();

        if(uName === '' || pass === ''){
            setInvalid(true);
        }
        else{
            // backend here
            if(uName === '19103296@usc.edu.ph'){
                if(pass === '123'){
                    Navigate('/');
                }
                else{
                    setInvalid(true);
                }
            }
            else{
                setInvalid(true);
            }
        }
    }
    

  return (
    <div className="font-poppins">
            <img className='absolute h-screen w-full' src={background} alt='background'/>
            <div className='w-[65.5%] h-[85%] overflow-hidden absolute bg-white -translate-x-2/4 -translate-y-2/4 flex items-center shadow-[0_0_10px_black,0_0_15px_rgba(0,0,0,0.5)] rounded-[20px] left-2/4 top-2/4'>
            <div className="left bg-[#DD2803] w-[48%] h-full flex flex-col items-center justify-center pl-[2.8rem] pr-[2.8rem]">
                <div className="imgBox "> 
                    <RiReservedFill size={60} color='white'/>
                </div>
               <div className="headline pb-[2rem]">
                    <div className="divider w-[100%] h-[1px] bg-white"></div>
                    <div className="headerL text-center flex flex-col justify-center">
                        <span className='text-[28px] bg-red capitalize font-semibold text-white'>welcome to reservo!</span>
                    </div>
                    <div className="divider w-[100%] h-[1px] bg-white"></div>
                    <div className="subH text-center text-white">
                        <span className='text-[14px] font-light'>Make a reservation in just a few click. Log in now!</span>
                    </div>
               </div>

                <div className="footHeader flex flex-col ">
                    <span className='capitalize text-[18px] font-bold text-white'>are you admin?</span>
                    <Link to={'/adlogin'} className='linker bg-white font-semibold text-center p-[0.7rem] rounded-full m-[1rem] text-[#DD2803]'>Admin page</Link>
                </div>
            </div>
            <div className="right flex flex-col h-[100%] w-[100%] pt-[3rem] space-y-100 bg-white items-center">
                <div className="TitleHeader h-[20%] text-center">
                    <span className='text-[28px] capitalize font-bold'>Login to your Account</span>
                    <div className="invalid p-[5px] ">
                        <span className= {(!invalid) ? 'text-[#FF2D2D] hidden' : 'text-[#FF2D2D]'}>invalid User or Password please Try again</span>
                    </div>
                </div>
                <form className='formBox w-[60%] flex flex-col'>
                    <div className="inputs">
                        <div className="I-Box flex flex-col space-y-2 mb-[5px]">
                            <label htmlFor="email" className='font-thin'>Email:</label>
                            <input type="email" className='bg-[#F3F3F3] border-solid border-2 h-[2.5rem] rounded-lg' name="email" id="Email" value={uName} onChange={(e) =>{setUser(e.target.value)}} required/>
                        </div>
                        <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                            <label htmlFor="pass" className='font-thin'>Password:</label>
                            <input type="password" className='bg-[#F3F3F3] border-solid border-2 h-[2.5rem] rounded-lg ' name="pass" id="pass" value={pass} onChange={(e) =>{setPass(e.target.value)}} required/>
                        </div>
                    </div>
                    <div className="frgt text-right text-[12px] mb-[2rem]">
                        <Link to={'/forgpass'}>Forgot Password?</Link>
                    </div>
                    <div className="buttons flex flex-col items-center space-y-5">
                        <button type='submit' onClick={submitHandler} className='button bg-[#DD2803] text-white p-[0.5em] w-[50%] rounded-full hover:bg-red'>Sign in</button>
                        <button type='submit' onClick={guestHandler} className='button text-[#DD2803] p-[0.5em] font-bold w-[50%] rounded-full border-solid border-2 border-[#DD2803]'>Log in as Guest</button>
                        <div className="signBox">
                            <span className='capitalize'>need an account ?</span>
                            <Link to={'/usRegister'} className='link text-[#DD2803] font-bold pl-1'>Sign Up</Link>
                        </div>
                    </div>
                </form>
           </div>
            </div>
        </div>
  )
}

export default UserLogin