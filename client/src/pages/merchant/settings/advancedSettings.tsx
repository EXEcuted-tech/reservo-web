import React, { useState, useEffect } from 'react'
import axios from 'axios'
import colors from '../../../common/colors'

export default function AdvancedSettings(){
    const request = {
        merchant_id: 3
    }
    
    const HandleEvent = () => {
        axios.post(`http://localhost:5000/merchant/delete`, { data: request})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);        })
    }
    return(
        <div style={{fontFamily: 'Poppins, sans-serif'}} className="w-auto h-auto bg-white m-8 p-5 rounded-lg animate-fade-in">
                <h1 className='text-2xl mr-5 ml-5 mb-2'><strong>Account Deletion or Deactivation</strong></h1>
                <hr/>
                <div className="m-5 text-lg text-gray-500 flex flex-row">
                    <p>You can permanently delete or temporarily deactivate your account.</p>
                </div>
                <div className='m-4 flow-root'>
                    <button
                        onClick={HandleEvent}
                        className="px-8 py-1 mr-2 float-right bg-[#840705] text-white rounded-2xl hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
                    >
                    Delete Account
                    </button>
                    <button
                        onClick={HandleEvent}
                        className="px-8 py-1 mr-2 float-right bg-[#DD2803] text-white rounded-2xl hover:bg-[#660605] focus:outline-none focus:ring focus:ring-blue-500 transition-colors delay-250 duration-[3000] ease-in"
                    >
                    Deactivate
                    </button>
                </div>
        </div>
    )
}