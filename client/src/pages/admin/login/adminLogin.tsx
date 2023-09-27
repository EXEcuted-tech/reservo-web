import React, { FormEvent,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


import { RiReservedFill } from 'react-icons/ri'; 

const AdminLogin = () => {
  const [invalid , setInvalid] = useState(false);
    const [uName , setUser] = useState('');
    const [pass , setPass] = useState('');

    const Navigate = useNavigate();

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
    <div className="page font-poppins bg-cover bg-login flex w-screen h-screen justify-center items-center">
        <div className="loginBox flex overflow-hidden bg-[grey] w-[50rem] h-[30rem] rounded-lg shadow-xl">
            <div className="left bg-white w-[50%] flex flex-col items-center justify-center pl-[2.8rem] pr-[2.8rem]">
                <div className="imgBox "> 
                    <RiReservedFill size={60} color='#660605'/>
                </div>
               <div className="headline pb-[2rem]">
                    <div className="divider w-[100%] h-[1px] bg-[#660605]"></div>
                    <div className="headerL text-center flex flex-col justify-center">
                        <span className='text-[28px] bg-red capitalize font-extrabold'>door to the <span className='text-[#660605]'>admin page</span></span>
                    </div>
                    <div className="divider w-[100%] h-[1px] bg-[#660605]"></div>
                    <div className="subH text-center text-[#660605]">
                        <span className='text-[14px] font-light text-[#660605]'>Make a reservation in just a few click. Log in now!</span>
                    </div>
               </div>

                <div className="footHeader flex flex-col ">
                    <span className='capitalize text-[18px] font-bold text-[#660605]'>not an admin?</span>

                    <Link to={'/uslogin'} className='bg-[#660605] font-semibold text-center p-[0.7rem] rounded-full m-[1rem] text-white'>User page</Link>
                    {/* <a href="/uslogin" className='bg-[#660605] font-semibold text-center p-[0.7rem] rounded-full m-[1rem] text-white'>User page</a> */}
                </div>
            </div>
            {/* LOGIN INPUT AREA */}
            <div className="right flex flex-col h-[100%] w-[100%] pt-[3rem] bg-[#660605] items-center">
                <div className="TitleHeader h-[20%] text-center">
                    <span className='text-[28px] capitalize font-bold text-white '>Login to your Account</span>
                    <div className="invalid p-[5px]">
                    <span className={(!invalid) ? 'text-[#FF2D2D] hidden' : 'text-[#FF2D2D]'}>invalid User or Password please Try again</span>
                </div>
                </div>
                <form className='formBox w-[60%] flex flex-col' >
                    <div className="inputs">
                        <div className="I-Box flex flex-col space-y-2 mb-[5px]">
                            <label htmlFor="email" className='font-thin text-white '>Email:</label>
                            <input type="email" className='pl-[0.5rem] bg-[#F3F3F3] border-solid border-2 h-[2.5rem] rounded-lg' name="email" id="Email" value={uName} onChange={(e) =>{setUser(e.target.value)}}/>
                        </div>
                        <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                            <label htmlFor="email" className='font-thin text-white '>Password:</label>
                            <input type="password" className='pl-[0.5rem] bg-[#F3F3F3] border-solid border-2 h-[2.5rem] rounded-lg ' name="pass" id="pass" value={pass} onChange={(e) =>{setPass(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="frgt text-right text-[12px] mb-[2rem] text-white ">
                      <Link to={'#'}>Forgot Password?</Link>
                        {/* <a href="#" target="_blank" rel="noopener noreferrer">Forgot Password?</a> */}
                    </div>
                    <div className="buttons flex flex-col items-center space-y-5">
                        <button type='submit' onClick={submitHandler} className='bg-white text-[#DD2803] p-[0.5em] w-[50%] rounded-full'>Sign in</button>
                    </div>
                </form>
           </div>
        </div>
    </div>
)
}

export default AdminLogin