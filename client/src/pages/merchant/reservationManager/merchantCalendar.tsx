import React, { useEffect, useContext } from 'react'
import { Fragment, useRef, useState } from "react";
import CalendarMerchSched from '../../../components/calendar/CalendarMerchSched';
import {mainContext} from './mainPage'
import axios from 'axios';
import config from '../../../common/config';


const MerchantCalendar = () => {
  const [showSetMerchSchedModal, setShowSetMerchSchedModal]:any = useContext(mainContext); 
  const retrieveSchedule = async () => {
    try {
      const schedule = await axios.get(`${config.API}/merchantsched/retrieve_sched`, {
        params: {
          merchID: Number(localStorage.getItem('merch_id'))
        }
      })
      return schedule.data.merchant
    }catch (error){
      console.error('Error fetching schedule:', error)
      return []
    }
  }

  // useEffect
  return (
    
    <div className="animate-fade-in">
      <div className="h-[90vh] font-poppins bg-[#F3F3F3] p-8">
      <div className='flex'>
        <div className='h-[10vh] w-[15%]'>
          <button className='border-black border-solid border w-[10vw] bg-slate-50 z-[100] text-black rounded-lg hover:bg-red-100'
          onClick={()=>{
            setShowSetMerchSchedModal(true)
            console.log(showSetMerchSchedModal)
          }
        }>
          Set Schedule 
          </button>
        </div>

        <div className='w-[65%]'>
          {/* Insert content here sa set schedule nga chuchu*/}
        </div>


          <div className='w-[20%]'>
            <h1 className='text-[1em] font-bold'>Legend</h1>
            <ul>
              <li className='py-[3%] ml-[8%]'>
                <span 
                  className="py-[0.5%] px-[6%] bg-[#F9DCC5] border-black border-[1px]"></span>
                <span className='ml-[5%] text-[0.85em]'>
                  Day Today
                </span>
              </li>
              <li className='py-[3%] ml-[8%]'>
                <span 
                  className="py-[0.5%] px-[6%] bg-[#F88376] border-black border-[1px]"></span>
                <span className='ml-[5%] text-[0.85em]'>
                  Non-Business Day
                </span>
              </li>
            </ul>
          </div>
      </div>
        {/* <CalendarMerchant /> */}
        <CalendarMerchSched />

      </div>
    </div>
    

  )
}

export default MerchantCalendar