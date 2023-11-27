import React, { useEffect, useState, useContext } from 'react'
import { RiReservedFill } from 'react-icons/ri'
import MerchAdHeader from '../../../components/headers/MerchAdHeader';
import ToggleHeader from '../../../components/headers/toggleHeader.tsx';
import ReservationManager from './reservationManager';
import MerchantCalendar from './MerchantCalendar.tsx';
import SetMerchantScheduleModal from '../../../components/modals/merchantCalendarModal/SetMerchantScheduleModal.tsx';


const ReserveManager = () => {
  const [urlPart, setUrlPart] = useState('');
  const [showSetMerchSchedModal, setShowSetMerchSchedModal] = useState(false)

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 2) {
      setUrlPart(pathParts[1]);
    }
  }, [window.location.pathname]);

  return (
    <>
    <mainContext.Provider value={[showSetMerchSchedModal, setShowSetMerchSchedModal]}>
      {showSetMerchSchedModal? <SetMerchantScheduleModal className='flex'/>: <></>}
    <div className={`bg-[#F3F3F3] h-full min-h-screen font-poppins overflow-y-auto overflow-x-hidden animate-fade-in`}>
      
      <div className= "w-full"> 
      <MerchAdHeader icon={RiReservedFill} title="Reservation Manager"/>
        <div className="bg-[#F3F3F3] h-[100vh] xs:max-sm:flex xs:max-sm:w-full xl:max-2xl:h-[230vh]">
          <div className="flex ml-10 mr-10 text-xl xs:max-sm:ml-[-1rem] xs:max-sm:mr-14">
          
            
            
            <ToggleHeader
                title1="Reservation Manager"
                title2='Merchant Calendar'
                component1={<ReservationManager />}
                component2={<MerchantCalendar />}
            />
            </div>
            </div>
        </div>
        
    </div>
    </mainContext.Provider>
    </>
  )
}

export const mainContext = React.createContext({});
export default ReserveManager
