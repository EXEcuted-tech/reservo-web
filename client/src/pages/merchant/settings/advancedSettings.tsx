import React, { useState, useEffect } from 'react'
import axios from 'axios'
import colors from '../../../common/colors'
import config from '../../../common/config'

export default function AdvancedSettings(){
    const merchID = Number(localStorage.getItem('merch_id'));

    const request = {
        merchant_id: merchID
    }
    
    const HandleEvent = () => {
        axios.post(`${config.API}/merchant/delete`, { data: request})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);        })
    }

    const HandleDeactivate = () => {
        const updateData = {
            account_status: "abolished",
        };
        axios.post(`${config.API}/merch/edit?userID=${merchID}`, updateData )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);        
        })
    }
    
    return(
        <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg animate-fade-in">
                <h1 className='text-2xl mr-5 ml-5 mb-2 xl:max-2xl:text-[0.9em]'><strong>Account Deletion or Deactivation</strong></h1>
                <hr/>
                <div className="m-5 text-lg text-gray-500 flex flex-row xl:max-2xl:text-[0.7em]">
                    <p>You can permanently delete or temporarily deactivate your account.</p>
                </div>
                <div className='m-4 flow-root xl:max-2xl:mt-[5%]'>
                    <button
                        onClick={HandleEvent}
                        className="px-8 py-1 mr-2 float-right bg-[#840705] text-white rounded-2xl xl:max-2xl:text-[0.65em] xl:max-2xl:px-6 xl:max-2xl:p-[0.15rem] hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
                    >
                    Delete Account
                    </button>
                    <button
                        onClick={HandleEvent}
                        className="px-8 py-1 mr-6 float-right bg-[#DD2803] text-white rounded-2xl xl:max-2xl:text-[0.65em] xl:max-2xl:px-6 xl:max-2xl:p-[0.15rem] hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
                    >
                    Deactivate
                    </button>
                </div>
        </div>
    )
}