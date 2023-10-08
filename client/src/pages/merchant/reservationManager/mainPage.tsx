import React, { useEffect, useState } from 'react'
import { RiReservedFill } from 'react-icons/ri'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import ReservationManager from './reservationManager'
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
    <div className="animate-fade-in">
      <MerchAdHeader icon={RiReservedFill} title="Reservation Manager"/>
        {urlPart == 'reservationmanager' && <ReservationManager/>}
    </div>
  )
}

export default ReserveManager