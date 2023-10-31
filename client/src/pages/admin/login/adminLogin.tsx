import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import background from '../../../assets/background-pattern.png'
import logo from '../../../assets/temp-logo-2.png'

import { RiReservedFill } from 'react-icons/ri';
import { Spinner } from '@material-tailwind/react/components/Spinner';
import config from '../../../common/config'
import axios from 'axios'
import Danger from '../../../components/box/danger';

const AdminLogin = () => {
    // const [invalid , setInvalid] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [accountType, setAccountType] = useState(10);
    const [errMess, setErrMess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const Navigate = useNavigate();

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsLoading(true);
        const col = "email_address";
        const val = email;

        const res = await axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`);

        if (res.status === 200) {
            const account = res.data.users[0];

            if (email === '' || pass === '') {
                setIsLoading(false);
                setErrMess("Fill all the fields required!");
                // setInvalid(true);
            } else {
                // console.log("TYPE:",account?.account_type);
<<<<<<< HEAD
                axios.post(`${config.API}/login`, {
                    account_email: email,
                    password: pass,
                    account_type: account.account_type ? account.account_type : 10
                }).then((res) => {
                    if (res.data.success == true) {
                        setErrMess('');
                        setTimeout(() => {
=======
                axios.post(`${config.API}/login`,{
                    account_email: email , 
                    password : pass,
                    account_type: account.account_type == 50 ? account.account_type : 10
                }).then((res)=>{
                        if(res.data.success == true){
                            setErrMess('');
                            setTimeout(()=>{
                                setIsLoading(false);
                            },800)
                            localStorage.setItem('admerchDetails', JSON.stringify(res.data.account_info));
                            account.account_type == 10 ? Navigate('/merchdash') : Navigate('/admindash');
                        }else{
>>>>>>> bdd8403244648ac985eb3ca649d3e7fb7f2295e8
                            setIsLoading(false);
                        }, 800)
                        localStorage.setItem('admerchDetails', JSON.stringify(res.data.account_info));
                        account.account_type == 10 ? Navigate('/merchdash') : Navigate('/admindash');
                    } else {
                        setIsLoading(false);
                        setErrMess(res.data.error);
                    }
                }
                ).catch((err) => {
                    setIsLoading(false);
                    setErrMess("Login failed. Try again!");
                    // setInvalid(true);
                });
            }
        }
    }

    // const checkEmail = async () =>{
    //     const col = "email_address";
    //     const val = email;
    //     await axios.get(`${config.API}/user/retrieve?col=${col}&val=${val}`)
    //     .then((res)=>{
    //        if(res.status === 200){
    //         // console.log("RESULT: ",res.data);
    //         const account = res.data.users[0];
    //         setAccountType(account?.account_type);
    //        }
    //     })
    // }

<<<<<<< HEAD
    return (
        <div className='animate-fade-in content-center w-[full] h-[full] overflow-hidden font-poppins'>
            {errMess != '' && <Danger message={errMess} />}
            {/* Background Picture */}
            <img className='absolute h-screen w-full' src={background} />
            <div className='absolute overflow-hidden shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4 text-align w-[980px] -translate-x-2/4 -translate-y-2/4 xl:max-2xl:w-[650px]'>
                {/* Left Box */}
                <div className="leftBox z-1 flex flex-col justify-center w-[35%] h-[63vh] bg-white float-left text-center pt-[70px] pb-[78px] px-10  xl:max-2xl:p-[30px]">
                    <div className="imgBox flex justify-center">
                        <img className='max-w-[70%] h-auto mb-[5%]' src={logo} />
                    </div>
                    <div className="headline pb-[2rem]">
                        <div className="divider w-[100%] h-[2px] bg-[#840705]"></div>
                        <div className="headerL text-center flex flex-col justify-center m-[5.45%] ">
                            <span className='text-[28px] bg-red capitalize font-bold text-black xl:max-2xl:text-[19px]'>Door to the</span><span className='text-[28px] font-bold text-[#840705]  xl:max-2xl:text-[19px]'>Merchant Page</span>
                        </div>
                        <div className="divider w-[100%] h-[2px] bg-[#840705]"></div>
                        <div className="subH text-center text-[#840705] mt-[5%]">
                            <span className='text-[14px] font-light text-black  xl:max-2xl:text-[0.7em]'>Make a reservation in <br />just a few clicks. Log in now!</span>
                        </div>
=======
  return (
    <div className='animate-fade-in content-center w-[full] h-[full] overflow-hidden font-poppins'>
      {errMess !='' && <Danger message={errMess}/>}
      {/* Background Picture */}
      <img className='absolute h-screen w-full' src={background} />
      <div className='absolute overflow-hidden shadow-[4px_15px_10px_4px_gray] rounded-[7px_7px_7px_7px] left-2/4 top-2/4 text-align w-[980px] -translate-x-2/4 -translate-y-2/4 xs:max-sm:w-[360px] xs:max-sm:h-[300px] xl:max-2xl:w-[650px]'>
        {/* Left Box */}
            <div className="leftBox w-[35%] h-[63vh] bg-white float-left text-center pt-[70px] pb-[78px] px-10 xs:max-sm:p-[15px] xs:max-sm:pt-[50px] xs:max-sm:h-[36vh] xl:max-2xl:p-[30px]">
                <div className="imgBox flex justify-center"> 
                <img className='max-w-[70%] h-auto mb-[5%]' src={logo}/>
                </div>
               <div className="headline pb-[2rem]">
                    <div className="divider w-[100%] h-[2px] bg-[#840705]"></div>
                    <div className="headerL text-center flex flex-col justify-center m-[5.45%] ">
                        <span className='text-[28px] bg-red capitalize font-bold text-black xs:max-sm:text-[10px] xl:max-2xl:text-[19px]'>Door to the</span>
                        <span className='text-[28px] font-bold text-[#840705] xs:max-sm:text-[10px] xl:max-2xl:text-[19px]'>Merchant Page</span>
                    </div>
                    <div className="divider w-[100%] h-[2px] bg-[#840705]"></div>
                    <div className="subH text-center text-[#840705] mt-[5%] flex flex-col justify-center xs:max-sm:mt-[10%]">
                        <span className='text-[14px] font-light text-black xs:max-sm:text-[0.43em] xl:max-2xl:text-[0.7em]'>Make a reservation in <br/>just a few clicks. Log in now!</span>
>>>>>>> bdd8403244648ac985eb3ca649d3e7fb7f2295e8
                    </div>

<<<<<<< HEAD
                    <div className="footHeader flex flex-col ">
                        <span className='text-[18px] font-bold text-black xl:max-2xl:text-[0.9em]'>Not a Merchant?</span>
                        <Link to={'/uslogin'} className='bg-[#840705] font-bold text-center p-[0.7rem] rounded-full m-[0.5rem] text-white w-[20vh] ml-[3.5vh] 
                        hover:bg-[#DD2803] transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.7em] xl:max-2xl:ml-[3.5vh]'>User Page</Link>
                    </div>
=======
                <div className="footHeader flex flex-col ">
                    <span className='text-[18px] font-bold text-black xs:max-sm:text-[0.6rem] xl:max-2xl:text-[0.9em]'>Not a Merchant?</span>
                    <Link to={'/uslogin'} className='bg-[#840705] font-bold text-center p-[0.7rem] rounded-full m-[0.5rem] text-white w-[20vh] ml-[3.5vh] 
                        hover:bg-[#DD2803] transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xs:max-sm:w-[9vh] xs:max-sm:ml-[1vh] xs:max-sm:p-[0.4rem] xl:max-2xl:text-[0.7em] xl:max-2xl:ml-[3.5vh]'>User Page</Link>
>>>>>>> bdd8403244648ac985eb3ca649d3e7fb7f2295e8
                </div>

<<<<<<< HEAD
                <div className="right w-[65%] h-[63vh] float-left pt-[4rem] bg-[#840705] rounded-[0px_7px_7px_0px] flex flex-col items-center xl:max-2xl:pt-[3rem] ">
                    <div className="TitleHeader space-y-5 text-center xl:max-2xl:mb-[0.5rem]">
                        <span className='text-[28px] capitalize font-bold text-white  xl:max-2xl:text-[1rem]'>Login to your Account</span>
                        {/* <div className="invalid p-[5px]">
                    <span className={(!invalid) ? 'text-white hidden' : 'text-white'}>{errMess} please Try again</span>
                    </div> */}
                    </div>
                    <form className='formBox w-[70%] flex flex-col' onSubmit={submitHandler} >
                        <div className="inputs">
                            <div className="I-Box flex flex-col space-y-2 mb-[20px]">
                                <label htmlFor="email" className='font-thin text-white xl:max-2xl:text-[0.8em] '>Email</label>
                                <input type="email" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em]' name="email" id="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                                <label htmlFor="email" className='font-thin text-white xl:max-2xl:text-[0.8em] '>Password</label>
                                <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em]' name="pass" id="pass" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                            </div>
                        </div>
                        <div className="frgt text-right text-[12px] mb-[2rem] text-white  hover:text-black transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.6em]">
                            <Link to={'/forgpass'}>Forgot Password?</Link>
                        </div>
                        <div className="buttons flex flex-col items-center space-y-5">
                            <button type='submit' className='flex items-center justify-center bg-white text-[#840705] p-[0.5em] w-[50%] rounded-full font-bold  
                            hover:text-[#DD2803]  transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.7em]'>
                                {isLoading && <Spinner className='mr-[1%]' />}
                                Sign in
                            </button>
                            <div className="signBox">
                                <span className='text-white font-extralight capitalize xl:max-2xl:text-[0.7em]'>need an account ?</span>
                                <Link to={'/merchregister'} className='text-white font-bold pl-1  hover:text-black  transition-colors delay-250 duration-[3000] ease-in xl:max-2xl:text-[0.7em]'>Sign Up</Link>
                            </div>
=======
            <div className="right w-[65%] h-[63vh] float-left pt-[4rem] bg-[#840705] rounded-[0px_7px_7px_0px] flex flex-col items-center xs:max-sm:pt-[30px] xs:max-sm:h-[36vh] xl:max-2xl:pt-[3rem] ">
                <div className="TitleHeader space-y-5 text-center xl:max-2xl:mb-[0.5rem]">
                    <span className='text-[28px] capitalize font-bold text-white xs:max-sm:text-[0.5rem] xl:max-2xl:text-[1rem]'>Login to your Account</span>
                    {/* <div className="invalid p-[5px]">
                    <span className={(!invalid) ? 'text-white hidden' : 'text-white'}>{errMess} please Try again</span>
                    </div> */}
                </div>
                <form className='formBox w-[70%] flex flex-col xs:max-sm:scale-45' onSubmit={submitHandler} >
                    <div className="inputs">
                        <div className="I-Box flex flex-col space-y-2 mb-[20px]">
                            <label htmlFor="email" className='font-thin text-white xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] '>Email</label>
                            <input type="email" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[3vh] xs:max-sm:text-[0.4rem] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em]' name="email" id="Email" value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="I-Box flex flex-col space-y-2 mb-[10px]">
                            <label htmlFor="email" className='font-thin text-white xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.8em] '>Password</label>
                            <input type="password" className='w-full inline-block border rounded box-border bg-[#EDF5F3] mx-0 my-2 px-5 py-3 border-solid border-[#ccc] xs:max-sm:h-[3vh] xs:max-sm:text-[0.4rem] xl:max-2xl:h-[6vh] xl:max-2xl:text-[0.7em]' name="pass" id="pass" value={pass} onChange={(e) =>{setPass(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="frgt text-right text-[12px] mb-[2rem] text-white  hover:text-black transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.3em] xs:max-sm:mb-[1rem] xl:max-2xl:text-[0.6em]">
                      <Link to={'/forgpass'}>Forgot Password?</Link>
                    </div>
                    <div className="buttons flex flex-col items-center space-y-5">
                        <button type='submit' className='flex items-center justify-center bg-white text-[#840705] p-[0.5em] w-[50%] rounded-full font-bold  
                            hover:text-[#DD2803]  transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xs:max-sm:w-[9vh] xl:max-2xl:text-[0.7em]'>
                            {isLoading && <Spinner className='mr-[1%]'/>}
                            Sign in
                        </button>
                        <div className="signBox">
                            <span className='text-white font-extralight capitalize xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>need an account ?</span>
                            <Link to={'/merchregister'} className='text-white font-bold pl-1  hover:text-black  transition-colors delay-250 duration-[3000] ease-in xs:max-sm:text-[0.4em] xl:max-2xl:text-[0.7em]'>Sign Up</Link>
>>>>>>> bdd8403244648ac985eb3ca649d3e7fb7f2295e8
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin