import React from 'react'

 import personKey from '../../../assets/usersign.png';

 import '../../../common/colors'


const UserLogin = () => {
  return (
    <div className="page bg-login flex w-screen h-screen justify-center items-center">
        <div className="loginBox flex overflow-hidden bg-[grey] w-[70%] h-[80%] rounded-lg">
            <div className="left bg-[#DD2803] w-[40%] flex justify-center">
                <div className="imgBox"> 
                    <img src={personKey} alt="" />
                </div>
            </div>
           <div className="right flex flex-col h-[100%] w-[100%] items-center">
                <div className="TitleHeader fontFamily">
                    Login to your Credential
                </div>
                <form className='formBox'>
                    <div className="I-Box">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="Email" />
                    </div>
                    <div className="I-Box">
                        <label htmlFor="email">Password:</label>
                        <input type="password" name="pass" id="pass" />
                    </div>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Forgot Password</a>
                    <button type='submit'>Login</button>
                </form>
           </div>
        </div>
    </div>
  )
}

export default UserLogin