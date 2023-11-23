import React, { useState, useEffect } from 'react'
import axios from 'axios'
import colors from '../../../common/colors'
import config from '../../../common/config'

export default function AdvancedSettings(){
    const storedAcc = localStorage.getItem('admerchDetails');

    const userId = storedAcc!== null && Number(JSON.parse(storedAcc).userID);

    const HandleEvent = () => {
        axios.post(`${config.API}/user/delete`, { user_id: userId })
        .then((response) => {
            
        })
        .catch((error) => {
            //PUT ERROR NOTIF      
        })
    }

    const handleDeactivate = () => {
        const updateData = {
            account_status: "abolished",
        };
        axios.post(`${config.API}/user/edit?userID=${userId}`, updateData)
        .then((response) => {
           
        })
        .catch((error) => {
            //PUT ERROR NOTIF       
        })
    }
    
    return(
        <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg animate-fade-in xs:max-sm:w-[120%] xs:max-sm:p-2 xs:max-sm:ml-[-2%] xs:max-sm:mt-[5%]">
                <h1 className='text-2xl mr-5 ml-5 mb-2  xs:max-sm:text-[0.8em] xs:max-sm:mb-1 xl:max-2xl:text-[0.9em]'><strong>Account Deletion or Deactivation</strong></h1>
                <hr/>
                <div className="m-5 text-lg text-gray-500 flex flex-row xs:max-sm:text-[0.7em] xl:max-2xl:text-[0.7em]">
                    <p>You can permanently delete or temporarily deactivate your account.</p>
                </div>
                <div className='m-4 flow-root xl:max-2xl:mt-[5%]'>
                    <button
                        onClick={HandleEvent}
                        className="px-8 py-1 mr-2 float-right bg-[#840705] text-white rounded-2xl xs:max-sm:text-[0.7em] xs:max-sm:px-4 xl:max-2xl:text-[0.65em] xl:max-2xl:px-6 xl:max-2xl:p-[0.15rem] hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
                    >
                    Delete Account
                    </button>
                    <button
                        onClick={handleDeactivate}
                        className="px-8 py-1 mr-6 float-right bg-[#DD2803] text-white rounded-2xl xs:max-sm:text-[0.7em] xs:max-sm:px-4 xl:max-2xl:text-[0.65em] xl:max-2xl:px-6 xl:max-2xl:p-[0.15rem] hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
                    >
                    Deactivate
                    </button>
                </div>
        </div>
    )
}