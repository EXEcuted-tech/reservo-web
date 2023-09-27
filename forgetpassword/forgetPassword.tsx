import React from 'react';
import '../forgetpassword/forgetPassword.css';
import usersign from '../forgetpassword/usersign.png';
import padlock from '../forgetpassword/padlock.png';
import email from '../forgetpassword/email.png'

const ForgetPassword = () => {
    return (
        <div className="font-poppins">
            <div className='fpBox'>
                <div className='infoSide'>
                    <img src={usersign} alt="User Sign" id='userSign' />
                    <h1>Forget Password</h1>
                    <p id='firstP'>Enter your email address and retrieve your account.</p>
                    <div className='loginPage'>
                        <p id='SecondP'>Already have a existing account?</p>
                        <button type="button" id='loginAccBtn'>Log In</button>
                    </div>
                </div>
                <div className='resetAccount'>
                    <img src={padlock} alt="Padlock" id='padlock' />
                    <h1>Forget Password?</h1>
                    <p id='message'>No worries! Enter your email, and we'll send a reset link to your inbox.</p>
                    <div>
                        <img src={email} alt="" id='email' /><p>Email Address</p>
                    </div>
                    <input type="email" name="" id="enterEmail" />
                    <button type="submit" id='resetPassBtn'>Reset Password</button>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
