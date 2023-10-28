import React, { useEffect, useState } from 'react'
import { RiReservedFill } from 'react-icons/ri'
import MerchAdHeader from '../../../components/headers/MerchAdHeader';
import ToggleHeader from '../../../components/headers/toggleHeader.tsx';
import ReservationManager from './reservationManager';
import MerchantCalendar from './merchantCalendar';

const ReserveManager = () => {
  const [urlPart, setUrlPart] = useState('');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length >= 2) {
      setUrlPart(pathParts[1]);
    }
  }, [window.location.pathname]);

  return (
    <div className={`bg-[#F3F3F3] h-auto min-h-screen w-full font-poppins overflow-y-auto overflow-x-hidden animate-fade-in`}>
      <div className= "w-full">
      <MerchAdHeader icon={RiReservedFill} title="Reservation Manager"/>
<<<<<<< HEAD
        <div>
          <div className="flex ml-10 mr-10 text-xl">
=======
        <div className="bg-[#F3F3F3] h-[100vh] xs:max-sm:flex xs:max-sm:overflow-x-auto xs:max-sm:w-full xl:max-2xl:h-[230vh]">
          <div className="flex ml-10 mr-10 text-xl xs:max-sm:ml-[-1rem] xs:max-sm:mr-14">
>>>>>>> 00a66d588ba2352ba95d984deafc9f29ad242c70
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
  )
}

export default ReserveManager