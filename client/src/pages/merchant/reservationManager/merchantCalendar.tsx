import { useEffect, useState, useContext } from 'react'
import { Fragment, useRef } from "react";
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import { RiReservedFill } from 'react-icons/ri'
import MerchantLayout from '../../../components/layout/MerchantLayout';
import ButtonC from '../../../components/calendar/ButtonC';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Button from './Component/Button';
import ReservationList from '../../../components/calendar/ReservationDetail';
import ReservationsList from '../../../components/calendar/ReservationsList';
import CalendarMerchSched from '../../../components/calendar/CalendarMerchSched';
import SetMerchantScheduleModal from '../../../components/modals/merchantCalendarModal/SetMerchantScheduleModal';
import {mainContext} from './mainPage'

const MerchantCalendar = () => {
  const [showSetMerchSchedModal, setShowSetMerchSchedModal]:any = useContext(mainContext); 
    
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
      
       
      <CalendarMerchSched />
      </div>
    </div>
    

  )
}

export default MerchantCalendar