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

  useEffect(() => {
    retrieveSchedule()
  }, []);
  return (
    
    <div className="animate-fade-in">
      <div className="h-[90vh] font-poppins bg-[#F3F3F3] p-8">

      <button className=' border-black border-solid border w-[10vw] bg-slate-50 z-[100] text-black rounded-lg hover:bg-red-100'
      onClick={()=>{
        setShowSetMerchSchedModal(true)
        console.log(showSetMerchSchedModal)
      }
      
    }
      >Set Schedule 
      
      </button>
      
      
        {/* <CalendarMerchant /> */}
        <CalendarMerchSched />

      </div>
    </div>
    

  )
}

export default MerchantCalendar