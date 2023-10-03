import React, { FormEvent,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import background from '../../../assets/background-pattern.png'
import logo from '../../../assets/temp-logo-2.png'

import { RiReservedFill } from 'react-icons/ri'; 
import config from '../../../common/config'
import axios from 'axios'

const AdminLogin = () => {
    const [invalid , setInvalid] = useState(false);
    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');
    const [errMess , setErrMess] = useState('Undetected Error');

    const Navigate = useNavigate();

    const submitHandler = (event:FormEvent) =>{
        event.preventDefault();

        if(email === '' || pass === ''){
            setErrMess("Fill all the Fields Required");
            setInvalid(true);
        }
        else{
            console.log(email);
            console.log(pass);
            axios.post(`${config.API}/login`,{
                account_email: email , 
                password : pass,
                account_type: 10
            }).then(
                (res)=>{
                    //if success means the email is exist and the password is correct
                    if(res.data.success){
                        localStorage.setItem('userDetails', JSON.stringify(res.data.account_info));
                        Navigate('/merchdash')
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
                                setErrMess("Email does not Exist");
                                setInvalid(true);
                        }
                    }
                    
                }
            ).catch((err) => { 
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
      <div className='absolute overflow-hidden shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4 text-align w-[980px] -translate-x-2/4 -translate-y-2/4 bg-blue'>
        {/* Left Box */}
            <div className="leftBox z-1 flex flex-col justify-center w-[35%] h-[63vh] bg-white float-left text-center pt-[70px] pb-[78px] px-10">
                <div className="imgBox flex justify-center"> 
                <img className='max-w-[70%] h-auto mb-[5%]' src={logo}/>
                </div>
               <div className="headline pb-[2rem]">
                    <div className="divider w-[100%] h-[2px] bg-[#840705]"></div>
                    <div className="headerL text-center flex flex-col justify-center m-[5.45%]">
                        <span className='text-[28px] bg-red capitalize font-bold text-black'>Door to the</span><span className='text-[28px] font-bold text-[#840705]'>Admin Page</span>
                    </div>
                    <div className="divider w-[100%] h-[2px] bg-[#840705]"></div>
                    <div className="subH text-center text-[#840705] mt-[5%]">
                        <span className='text-[14px] font-light text-black'>Make a reservation in <br/>just a few click. Log in now!</span>
                    </div>
               </div>

                <div className="footHeader flex flex-col ">
                    <span className='text-[18px] font-bold text-black'>Not an Admin?</span>
                    <Link to={'/uslogin'} className='bg-[#840705] font-bold text-center p-[0.7rem] rounded-full m-[0.5rem] text-white w-[20vh] ml-[3.5vh]'>User page</Link>
                </div>
            </div>
            <div className="right w-[65%] h-[63vh] float-left pt-[4rem] bg-[#840705] rounded-[0px_7px_7px_0px] flex flex-col items-center">
                <div className="TitleHeader space-y-5 text-center">
                    <span className='text-[28px] capitalize font-bold text-white'>Login to your Account</span>
                    <div className="invalid p-[5px]">
                    <span className={(!invalid) ? 'text-white hidden' : 'text-white'}>{errMess} please Try again</span>
                </div>
                </div>
                <form className='formBox w-[70%] flex flex-col' onSubmit={submitHandler} >
                    <div className="inputs">
                        <div className="I-Box flex flex-col space-y-2 mb-[20px]">
                            <label htmlFor="email" className='font-thin text-white '>Email:</label>
                            <input type="email" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]' name="email" id="Email" value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                            <label htmlFor="email" className='font-thin text-white '>Password:</label>
                            <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc]' name="pass" id="pass" value={pass} onChange={(e) =>{setPass(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="frgt text-right text-[12px] mb-[2rem] text-white ">
                      <Link to={'#'}>Forgot Password?</Link>
                    </div>
                    <div className="buttons flex flex-col items-center space-y-5">
                        <button type='submit' className='bg-white text-[#840705] p-[0.5em] w-[50%] rounded-full font-bold'>Sign in</button>
                        <div className="signBox">
                            <span className='text-white font-extralight capitalize'>need an account ?</span>
                            <Link to={'/merchregister'} className='text-white font-bold pl-1'>Sign Up</Link>
                        </div>
                    </div>
                </form>
           </div>
            </div>
        </div>
)
}

export default AdminLogin