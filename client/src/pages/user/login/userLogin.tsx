import React, { FormEvent,useState } from 'react'

import background from '../../../assets/background-pattern.png'
import logo from '../../../assets/temp-logo-2w.png'

import { RiReservedFill } from 'react-icons/ri'; 
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../common/config'
import axios from 'axios'


const UserLogin = () => {

    const [invalid , setInvalid] = useState(false);
    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');
    const [errMess , setErrMess] = useState('Invalid Credentials');
    const Navigate = useNavigate();

    const guestHandler = () =>{
        Navigate('/');
    }

    const submitHandler = (event:FormEvent) =>{
        event.preventDefault();

        if(email === '' || pass === ''){
            setErrMess("Fill all the Fields Required");
            setInvalid(true);
        }
        else{
            axios.post(`${config.API}:5000/login`,{
                account_email: email , 
                password : pass,
                account_type: 1
            }).then((res)=>{
                if(res.data.success){
                    localStorage.setItem('userDetails', JSON.stringify(res.data.account_info));
                    Navigate('/')
                }
                else{
                    switch(res.data.message){
                        case 'Password is required':
                            setErrMess(res.data.message);
                            setInvalid(true);
                            break;
                        case 'Password is too short':
                            setErrMess(res.data.message);
                            setInvalid(true);
                            break;
                        default:
                            setErrMess(res.data.message);
                            setInvalid(true);
                    }
                }
            }).catch((err) => { 
                //Insert here something to store the error message
                setErrMess(err.response.data.message);
                setInvalid(true);
            });
        }
    }
    



  return (
    <div className='content-center w-[full] h-[full] overflow-hidden font-poppins'>
      {/* Background Picture */}
      <img className='absolute h-screen w-full' src={background} />
      <div className='absolute overflow-hidden shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4 text-align w-[980px] -translate-x-2/4 -translate-y-2/4'>
        {/* Left Box */}
        <div className="leftBox flex flex-col justify-center w-[35%] h-[63vh] bg-[#DD2803] float-left text-center pt-[70px] pb-[78px] px-10">
                <div className="imgBox flex justify-center"> 
                    <img className='max-w-[70%] h-auto mb-[5%]' src={logo}/>

                </div>
               <div className="headline pb-[2rem]">
                    <div className="divider w-[100%] h-[2px] bg-white"></div>
                    <div className="headerL text-center flex flex-col justify-center m-[5.45%]">
                        <span className='text-[28px] bg-red capitalize font-semibold text-white'>welcome to reservo!</span>
                    </div>
                    <div className="divider w-[100%] h-[2px] bg-white"></div>
                    <div className="subH text-center text-white mt-[5%]">
                        <span className='text-[1em] font-light'>Make a reservation in<br/> just a few click. Log in now!</span>
                    </div>
               </div>

                <div className="footHeader flex flex-col">
                    <span className='text-[1.17em] text-white font-bold'>Are You an Admin?</span>
                    <Link to={'/adlogin'} className='bg-white font-bold text-center p-[0.7rem] rounded-full m-[0.5rem] text-[#DD2803] w-[20vh] ml-[3.5vh]'>Admin page</Link>
                </div>
            </div>
            <div className="right w-[65%] h-[63vh] float-left bg-white shadow-[4px_15px_10px_4px_gray] rounded-[0px_7px_7px_0px] flex flex-col justify-center items-center">
                <div className="TitleHeader space-y-5 text-center">
                    <span className='text-[28px] capitalize font-bold '>Login to your Account</span>
                    <div className="invalid p-[5px]">
                        <span className= {(!invalid) ? 'text-[#FF2D2D] hidden' : 'text-[#FF2D2D]'}>{errMess}. Please try again!</span>
                    </div>
                </div>
                <form className='formBox w-[70%] flex flex-col'>
                    <div className="inputs">
                        <div className="I-Box flex flex-col space-y-2 mb-[20px]">
                            <label htmlFor="email" className='font-thin'>Email</label>
                            <input type="email" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]' name="email" id="Email" value={email} onChange={(e) =>{setEmail(e.target.value)}} required/>
                        </div>
                        <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                            <label htmlFor="pass" className='font-thin'>Password</label>
                            <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]' name="pass" id="pass" value={pass} onChange={(e) =>{setPass(e.target.value)}} required/>
                        </div>
                    </div>
                    <div className="frgt text-right text-[0.8em] mb-[2rem] ">
                        <Link to={'/forgpass'}>Forgot Password?</Link>
                    </div>
                    <div className="buttons flex flex-col items-center space-y-5">
                        <button type='submit' onClick={submitHandler} className='button bg-[#DD2803] text-white p-[0.5em] w-[50%] rounded-full 
                                hover:bg-[#9a1a00] font-bold'>Sign in</button>
                        <button type='submit' onClick={guestHandler} className='button text-[#DD2803] p-[0.5em] font-[bold] w-[50%] rounded-full border-solid border-2 border-[#DD2803] font-bold'>Log in as Guest</button>
                        <div className="signBox">
                            <span className='capitalize'>need an account ?</span>
                            <Link to={'/usRegister'} className='link text-[#DD2803] font-bold pl-1 hover:text-[#9a1a00]'>Sign Up</Link>
                        </div>    
                    </div>
                </form>
           </div>

      </div>
    </div>
  )
}

export default UserLogin